from sklearn.metrics.pairwise import cosine_similarity
from transformers import AutoTokenizer, AutoModel

import torch
from sklearn.feature_extraction.text import TfidfVectorizer

import numpy as np
import pandas as pd
import os
import joblib

def check_chat_data() :
    '''
    - 챗봇 모델 및 data가 존재하는지 확인
    - 존재하지 않는 경우 챗봇 사용 제한 ?

    return True/False
    '''
    # 챗봇 모델 저장 경로 : '/data/chatbot_model.pkl'
    # 데이터 저장 경로 : '/data/chatbot_data.pkl'
    model = 'data/chatbot_model.pkl'
    tokenizer = 'data/chatbot_tokenizer.pkl'
    data  = 'data/chatbot_data.pkl'

    # 모델과 데이터 존재 확인
    if os.path.isfile(model) and os.path.isfile(tokenizer) and os.path.isfile(data):
        return True
    
    else :
        init_chat_model_data()
    
    return True

def init_chat_model_data() :
    '''
    - 허깅페이스에서 사용하는 모델 및 토크나이저 다운로드 
    - 모델 및 토크나이저 저장 
    - 데이터에 대한 부분은 고려
    '''
    tokenizer = AutoTokenizer.from_pretrained('jhgan/ko-sroberta-multitask')
    model = AutoModel.from_pretrained('jhgan/ko-sroberta-multitask')

    tokenizer_path = os.path.join(os.getcwd(), 'data','tokenizer_model.pkl')
    model_path = os.path.join(os.getcwd(), 'data','chatbot_model.pkl')

    joblib.dump(tokenizer, tokenizer_path)
    joblib.dump(model, model_path)


def load_chatbot_model() :
    '''
    - 챗봇 모델 로드

    return : 챗봇 모델
    '''
    path = os.path.join(os.getcwd(), 'data', 'chatbot_model.pkl')
    chatbot_model = joblib.load(path)

    return chatbot_model


def load_chatbot_tokenizer() :
    '''
    - 챗봇 토크나이저 로드 

    return : 챗봇 토크나이저
    '''
    path = os.path.join(os.getcwd(), 'data', 'chatbot_tokenizer.pkl')
    chatbot_tokenizer = pd.read_pickle(path)

    return chatbot_tokenizer


def load_chatbot_data() :
    '''
    - 챗봇 데이터 로드

    return : 챗봇 데이터
    '''
    path = os.path.join(os.getcwd(), 'data', 'chatbot_data.pkl')
    chatbot_data = pd.read_pickle(path)

    return chatbot_data


def mean_pooling(model_output, attention_mask):
    '''
    - 챗봇에서 사용하는 mean_pooling 함수
    - GPU를 사용하는 Sentence Transformers 방식을 대신 가능
    '''
    token_embeddings = model_output[0] #First element of model_output contains all token embeddings
    input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    
    return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)


def use_chatbot(user_question, chatbot_model) :
    '''
    - 사용자 입력 문자열에 대하여 챗봇의 답변을 문자열로 반환
    - 현재 transformers 를 이용한 방식 

    user_question : str
    return : str
    '''

    if check_chat_data()==True :
        #chatbot_model = load_chatbot_model()
        chatbot_data  = load_chatbot_data()
        chatbot_tokenizer = load_chatbot_tokenizer()

        encoded_input = chatbot_tokenizer(user_question, padding=True, truncation=True, return_tensors='pt')  

        with torch.no_grad():
            input_output = chatbot_model(**encoded_input)

        input_embeddings = mean_pooling(input_output, encoded_input['attention_mask']) 
        input_embeddings_array = input_embeddings.numpy()
        final_input_data = input_embeddings_array.reshape(-1,)

        chatbot_data["cosin"] = chatbot_data["embedding"].map(lambda x : cosine_similarity([final_input_data],[x]).squeeze())

        # 해당 수치는 조정해보는 것도 좋음.
        # if chatbot_data["cosin"].max() < 0.50 :
        if chatbot_data["cosin"].max() < 0.50 :
            answer = "핵심 키워드나 다른 키워드를 사용하여 다시 질문 해주시겠어요 ?"
            return answer 

    else :
         answer = "챗봇이 잠시 쉬러갔어요. 금방 돌아올게요!"

    temp = chatbot_data.sort_values(["cosin"], ascending=False)[0:1]
    answer = ''.join([x for x in temp["answer"]])

    return answer