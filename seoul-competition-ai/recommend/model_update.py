#!/usr/bin/env python
# coding: utf-8

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import os
from joblib import dump
from konlpy.tag import Okt
from datetime import datetime as dt

import numpy as np
import pandas as pd

import re
import requests
import json

import openai

import warnings
warnings.filterwarnings("ignore")

import chat 
import torch

# 모델 및 df 존재 확인
def check_model_data() :
    '''
    - 모델 및 data가 존재하는지 확인
    - 존재하지 않는 경우 모델 및 data 생성
    '''
    # 모델 저장 경로 : '/data/tfidf.pkl'
    # 데이터 저장 경로 : '/data/data.pkl'
    model = 'data/tfidf.pkl'
    data  = 'data/data.pkl'

    # 모델과 데이터 존재 확인
    if os.path.isfile(model) and os.path.isfile(data):
        # print("파일 있음")
        return True
    else :
        #print("파일 없음")
        # 최초 모델 및 데이터 생성 코드 실행 추가
        init_model_data()


# 최초 모델 및 df 생성
def init_model_data() :
    FASTAPI_API_URL = os.environ.get("FASTAPI_API_URL")
    '''
    - 전체 데이터에 대한 모델 생성 및 데이터 프레임 저장
    - 교육 정보 spring에 전체 데이터 요청하는 부분 맞추기


    return 없음 : model, dataframe 두 개의파일 pkl로 저장
    '''
    # 교육 정보 spring에 현재 존재하는 전체 데이터 요청 코드 작성

    pages = 0
    sprint_URL = f"{FASTAPI_API_URL}/educations?page={pages}"
    response = requests.get(sprint_URL)
    response_data = response.content.decode()
    json_data = json.loads(response_data)

    pages = json_data["totalPages"]

    data = pd.DataFrame()

    for page in range(0, pages+1) :
        sprint_URL = f"{FASTAPI_API_URL}/educations?page={page}"

        response = requests.get(sprint_URL)
        response_data = response.content.decode()
        json_data = json.loads(response_data)
        temp_data = pd.DataFrame(json_data['data'])

        data = pd.concat( [data, temp_data] )

    # 받아온 데이터에 대한 컬럼명, 전처리 등 수행
    data = date_preprocessing(data)
    data = data_preprocessing(data)

    # reviewsCount 컬럼 삭제
    data.drop("reviewsCount", axis=1, inplace=True)

    # 저장
    save_model(data)
    save_dataframe(data)


# 모델 업데이트
def update_model_data(update_data) :
    # 스케쥴러를 통한 한달 단위 기준 모델 및 데이터 업데이트
    # 1. 데이터 : 기존 데이터에 추가, 중복 확인
    # 2. 모델 : 생성된 데이터에 대하여 Vectorizor 모델 재 생성 후 저장

    education_data = pd.DataFrame([edu.dict() for edu in update_data.educations])
    chatHistories_data = pd.DataFrame([edu.dict() for edu in update_data.chatHistories])

    #

    ### 교육 추천 관련 처리

    # clean_sentence 처리
    # # 1. 날짜 형식 변경
    add_data = date_preprocessing(education_data)

    # # 2. 불용어 처리 및 형태소 분리
    add_data = data_preprocessing(add_data)

    # 기존 데이터 로드
    path = os.path.join(os.getcwd(), 'data', 'data.pkl')
    data = pd.read_pickle(path)

    # 원본 데이터와 concat으로 결합
    data = pd.concat([data, add_data])

    # 중복 제거
    data = data.drop_duplicates()

    # 저장
    save_model(data)
    save_dataframe(data)

    ### 교육 추천 관련 처리  챗봇 데이터 저장
    chat_path = os.path.join(os.getcwd(), 'data', 'chatbot_history.pkl')

    # 날짜 처리
    chatHistories_data["createdAt"] = pd.to_datetime( chatHistories_data["createdAt"]).dt.date
    chatHistories_data["createdAt"] = pd.to_datetime(chatHistories_data["createdAt"])

    chatHistories_data.to_pickle(chat_path)

    chathistory_fix()


def chathistory_fix() :
    '''
    - 챗봇 대화 히스토리 항목의 유저 부정 평가에 대한 Chat GPT API 를 사용한 답변 수정.
    - 기존 챗봇 대화 데이터에 추가
    - 기존 챗봇 대화 데이터 임베딩 값 수정

    return : chatbot_data

    '''
    guide_msg = '''다음은 챗봇이 서비스 중인 사이트에 대한 정보입니다. 
            1. 회원 가입 및 로그인 기능은 없음.
            2.  교육정보 검색 기능 : 공공 데이터에서 제공해주는 교육 정보를 받아와서 사이트 내에서 검색을 하면 
            교육에 대한 정보를 사용자에게 출력함.
            3. 교육 정보 추천 기능 : 사용자가 검색한 교육 정보와 유사한 교육을 추천함.
            4. 이 챗봇은 사이트의 이용에 대한 도움을 주는 용도임.
            5. 사용자가 검색하여 확인한 교육정보를 클릭하면 교육의 상세정보를 볼 수 있음. 
            6. 교육 정보에는 댓글을 남길수 있음.
            7. 자유게시판에 글을 작성할 수 있음.
            8. 자유게시판, 교육정보의 댓글, 자유게시판 게시물의 댓글은 모두 로그인을 필요로 하지 않음.
            9. 8번 항목에 대해 닉네임과 비밀번호를 설정하는 방식을 사용함
            10. 비밀번호를 잊어버리면 게시물의 수정 및 삭제를 할 수 없음.
            
            위와 같은 조건의 사이트에서 운영되는 챗봇이라는 가정하에 한국어로 답변을 작성해야함.
            
            질문 : 
            '''

    OPENAI_API_KEY = os.environ.get("FASTAPI_OPENAI_KEY")
    openai.api_key = OPENAI_API_KEY

    history_path = os.path.join(os.getcwd(), 'data', 'chatbot_history.pkl')
    data_path = os.path.join(os.getcwd(), 'data', 'chatbot_data.pkl')

    history_data = pd.read_pickle(history_path)
    chatbot_data = pd.read_pickle(data_path) 

    new_answer = []

    for q,a in zip(history_data["question"], history_data["answer"]) :
        prompt = q+"질문의 답으로"+a+"는 적합하지 않다. 적합한 답변을 한문장으로 새로 작성"
        final_prompt = guide_msg + prompt
        
        response = chatGPT(final_prompt)
        
        new_answer.append( response["choices"][0]["message"]["content"] )

    history_data["answer"] = new_answer

    final_df = pd.concat([chatbot_data,history_data])

    chat_input = final_df["question"].to_list()

    tokenizer = chat.load_chatbot_tokenizer()
    encoded_question = tokenizer(chat_input, padding=True, truncation=True, return_tensors='pt')

    model = chat.load_chatbot_model()    
    with torch.no_grad():
        model_output = model(**encoded_question)

    sentence_embeddings = chat.mean_pooling(model_output, encoded_question['attention_mask'])

    embedding_list = sentence_embeddings.tolist()

    chatbot_data["embedding"] = embedding_list

    path = os.path.join(os.getcwd(), 'data', 'chatbot_data.pkl')
    chatbot_data.to_pickle(path)



def chatGPT(prompt) :
    completion = openai.ChatCompletion.create(
        # model
        model = "gpt-3.5-turbo",
        
        # msg
        messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": prompt},
            
        ],
        temperature = 0.2

    )
        
    return completion


def date_preprocessing(dataframe) :
    '''
    - 데이터에 대한 날짜 형식 변경

    dataframe  : dataframe

    return : dataframe

    '''
    ## 날짜 정보 datetime

    # 표현 형식 변경
    dataframe["registerStart"] = dataframe["registerStart"].apply(lambda x : re.sub(r"\.", r"-", x) )
    dataframe["registerEnd"] = dataframe["registerEnd"].apply(lambda x : re.sub(r"\.", r"-", x) )
    dataframe["educationStart"] = dataframe["educationStart"].apply(lambda x : re.sub(r"\.", r"-", x) )
    dataframe["educationEnd"] = dataframe["educationEnd"].apply(lambda x : re.sub(r"\.", r"-", x) )

    # datetime 형태 변경
    date_trans_col = ["registerStart","registerEnd","educationStart","educationEnd"]

    for col in date_trans_col :
        dataframe[col] = pd.to_datetime( dataframe[col] )

    return dataframe


# 불용어 처리
def clean_sentence(sentence) :
    '''
    - 데이터 분석 이후 문장에서 의미가 없을 것으로 판단되는 단어 불용어로 판단하여 처리

    sentence : Series

    return : Series

    '''

    # 날짜, 기수, 차수 제거
    sentence = re.sub(r"[0-9]+년", r" ", sentence)
    sentence = re.sub(r"[0-9]+차", r" ", sentence)
    sentence = re.sub(r"[0-9]+기", r" ", sentence)
    sentence = re.sub(r"[0-9]+월", r" ", sentence)
    sentence = re.sub(r"[0-9]+일", r" ", sentence)
    sentence = re.sub(r"[0-9]{1,2}.[0-9]{1,2}", r" ", sentence)

    # (주) , (요일)
    sentence = re.sub(r"\(+[가-힣]+\)", r" ", sentence)
    sentence = re.sub(r"[가-힣]째주", r" ", sentence)
    sentence = re.sub(r"[가-힣]{1}요일", r" ", sentence)

    # 마감 키워드 필요 없음
    sentence = re.sub(r"마감", r" ", sentence)

    # 50이라는 숫자 필요 없음
    sentence = re.sub(r"50", r" ", sentence)
    # 자격증 n급 필요 없을듯
    sentence = re.sub(r"[0-9]+급", r" ", sentence)
    # n단계도 필요 없을듯
    sentence = re.sub(r"[0-9]+단계", r" ", sentence)
    sentence = re.sub(r"[^0-9가-힣a-zA-Z]", r" ", sentence)

    return sentence


def tokenize(original_sent):
    '''
    - Okt 형태소 분석기를 사용하여 문장를 "명사" 단위로 분류
    - 현 데이터는 문장의 의미보다는 사용되는 핵심 단어가 중요할 것으로 판단하여 결정

    sentence : Series

    return : Series

    '''

    tokenizer = Okt()

    # tokenizer를 이용하여 original_sent를 토큰화하여 tokenized_sent에 저장하고, 이를 반환합니다.
    sentence = original_sent.replace('\n', '').strip()

    # tokenizer.morphs(sentence)를 통해 sentence를 토큰화한 결과를 tokenized_sent에 저장합니다.
    tokens = tokenizer.morphs(sentence)

    tokens = ' '.join(tokens)

    return tokens

def data_preprocessing(dataframe) :
    '''
    -  정의된 불용어 처리, 토크나이저를 데이터에 적용

    dataframe : dataframe

    return : dataframe

    '''
    # 교육명 불용어 처리하여 clean_sentence 컬럼으로 생성
    dataframe["clean_sentence"] = dataframe["name"].apply(lambda x : clean_sentence(x) )

    # 교육명 okt 명사 토크나이징하여 okt 컬럼으로 생성
    dataframe["okt"] = dataframe["clean_sentence"].apply(lambda x : tokenize(x) )

    return dataframe

def save_model(data) :
    '''
    -  전체 데이터에 대한 tf-idf 모델 생성 후 저장

    data : dataframe

    '''
    path = os.path.join(os.getcwd(), 'data','tfidf.pkl')
    tfidf_vector = TfidfVectorizer().fit( data["okt"] )
    dump(tfidf_vector, path)


def save_dataframe(data) :
    path = os.path.join(os.getcwd(), 'data', 'data.pkl')
    data.to_pickle(path)






