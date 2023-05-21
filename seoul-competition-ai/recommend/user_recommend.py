#!/usr/bin/env python
# coding: utf-8

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import os
import joblib
from joblib import dump
from konlpy.tag import Okt
from datetime import datetime as dt

import numpy as np
import pandas as pd

import re
import requests
import json

import warnings
warnings.filterwarnings("ignore")



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

    # tokenizer.nouns(sentence) -> 명사만 추출
    tokens = tokenizer.nouns(sentence)

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


# 입력데이터 처리 함수

# 정규화
def l1_normalize(vector):
    '''
    - 코사인 유사도를 구하기 이전 범위 조정을 위함

    vector : tf-idf vector

    return : l1_normalize 결과

    '''
    norm = np.sum(vector)
    return vector / norm

def cosine_similarity_value(vec_1, vec_2):
    '''
    - 코사인 유사도 계산

    vec_1 : l1_normalize tf-idf vector
    vec_2 : l1_normalize tf-idf vector

    return : 코사인 유사도 계산 결과

    '''
    return round(cosine_similarity(vec_1, vec_2)[0][0], 3)

def possible_edu (dataframe) :
    '''
    - 날짜 기준으로 가능한 교육

    dataframe : dataframe

    return : dataframe

    '''
    today = f"{dt.today().year}-{dt.today().month}-{dt.today().day}"

    # 수강 신청이 가능한 경우
    # 1. 교육 상태가 마감이 아닌 경우
    cond_01 = (dataframe["status"] == "마감")

    # 2. 교육 신청 종료일이 현재 날짜를 지나지 않은 경우
    cond_02 = (dataframe["registerEnd"] > today)

    temp_data = dataframe.loc[ ~cond_01 & cond_02 ]

    return temp_data

def load_model() :
    '''
    - 생성되어 있는 tf-idf 모델을 pickle 형태로 load

    return : tf-idf model

    '''
    path = os.path.join(os.getcwd(), 'data', 'tfidf.pkl')
    model = joblib.load(path)
    return model


def load_dataframe() :
    path = os.path.join(os.getcwd(), 'data', 'data.pkl')
    data = pd.read_pickle(path)

    return data


def edu_recommend(input_data) :
    '''
    - 입력한 단어에 대하여 유사한 교육 추천
    - 백엔드와 연결 이후 return 값을 아이디로 변경

    input_data : str
    data : dataframe
    vectorizer : TfidfVectorizer

    return : str

    '''
    vectorizer = load_model()
    data = load_dataframe()
    data = possible_edu(data)

    # 입력 단어에 대한 임시 데이터 프레임 생성
    temp = pd.DataFrame({
        # "교육넘버" : "0000",
        "name": [input_data],
        "clean_sentence" : clean_sentence(input_data),
         "okt" : ["123"]
    })

    temp["okt"] = temp["clean_sentence"].apply(lambda x : tokenize(x) )

    # 검색 단어를 포함한 전체 데이터 프레임
    temp_total_data = data[::]

    temp_total_data = pd.concat([temp_total_data,temp])
    temp_total_data = temp_total_data.reset_index( drop=True )

    # TF-IDF 벡터화
    tfidf_vector = vectorizer.transform( temp_total_data["okt"] )
    tfidf_norm_l1 = l1_normalize(tfidf_vector)

    # 검색 단어
    target = tfidf_norm_l1[-1]

    # 코사인 유사도 적용
    cosin_result = []

    for i in tfidf_norm_l1 :
        cosin_result.append( cosine_similarity_value(target, i) )

    temp_total_data["cosin"] = cosin_result

    temp = temp_total_data.loc[ temp_total_data["cosin"] > 0 ]
    temp = temp.drop_duplicates()
    temp = temp.sort_values(["cosin"], ascending=False)[1:6]

    response = []

    if temp.empty :
            print("추천 정보가 없습니다.")
            # empty list
            return response

    for i in temp["id"]:
        response.append({ "id" : int(i)})

    return response


def id_edu_recommend(id) :
    '''
    - 입력한 id 값에 대하여 유사한 교육 추천

    input_data : int
    data : dataframe
    vectorizer : TfidfVectorizer

    return : str
    '''

    vectorizer = load_model()
    data = load_dataframe()

    user_col = data.loc[ data["id"] == id ]

    pos_data = possible_edu(data)
    total_data = pd.concat([pos_data, user_col])
    total_data = total_data.drop_duplicates(keep="last")

    # TF-IDF 벡터화
    tfidf_vector = vectorizer.transform( total_data["okt"] )
    tfidf_norm_l1 = l1_normalize(tfidf_vector)

    # 검색 단어
    target = tfidf_norm_l1[-1]

    # 코사인 유사도 적용
    cosin_result = []

    for i in tfidf_norm_l1 :
        cosin_result.append( cosine_similarity_value(target, i) )

    total_data["cosin"] = cosin_result

    temp = total_data.loc[ total_data["cosin"] > 0 ]
    temp = temp.drop_duplicates()
    temp = temp.sort_values(["cosin"], ascending=False)[1:6]

    response = []

    if temp.empty :
            print("추천 정보가 없습니다.")
            # empty list
            return response

    for i in temp["id"]:
        response.append({ "id" : i})

    return response