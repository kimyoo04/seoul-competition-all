from sklearn.metrics.pairwise import cosine_similarity
from transformers import AutoTokenizer, AutoModel

import torch
import numpy as np
import pandas as pd
import os
import joblib
import openai


def return_guide() :

    guide_msg = '''
                    1. 사이트 종류: 교육 정보 공유 사이트
                    2. 기능:
                        교육 정보 게시판: 교육과 관련된 정보를 게시하고 공유하는 공간입니다. 교육정보 페이지 우측 하단에 '골라보기' 버튼을 클릭하여 확인할 수 있습니다.
                        자유게시판: 교육과는 관련없는 다양한 주제로 글을 작성하고 의견을 공유하는 공간입니다.
                        댓글 기능: 교육 정보나 게시글에 대한 댓글을 작성하고 수정, 삭제할 수 있습니다. 댓글 작성 시 비밀번호를 설정하여 식별이 가능합니다.
                        별점: 교육 정보에 대한 별점을 남기는 기능은 제공하지 않습니다.
                        검색 기능: 교육 정보 검색 기능은 제공합니다. 사용자가 검색한 교육 정보에 대하여 유사한 교육 정보를 추천해줍니다.
                        사용자 식별: 댓글 작성 시 비밀번호를 설정하여 수정과 삭제를 제한적으로 가능하게 합니다.
                    
                    사용자가 인사 및 고마움의 표현에 대해서는 자연스럽게 답변할 것.
                    조건에 맞지 않는 질문의 경우에는 최대한 친절하게 답할 것.

                    답변은 최대한 한 문장으로 끝낼것.

                    질문 :
            '''
    return guide_msg

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


def chatGPT(prompt) :
    OPENAI_API_KEY = os.environ.get("FASTAPI_OPENAI_KEY")
    openai.api_key = OPENAI_API_KEY

    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",

        messages=[
        {"role": "user", "content": prompt},
        ]
        ,
        temperature = 0.3
    )
    return response


def use_chatbot(user_question, chatbot_model) :
    '''
    - 사용자 입력 문자열에 대하여 챗봇의 답변을 문자열로 반환
    - 현재 transformers 를 이용한 방식 

    user_question : str
    return : str
    '''

    if check_chat_data()==True :
        origin_chatbot_data  = load_chatbot_data()
        chatbot_data = origin_chatbot_data.copy()

        chatbot_tokenizer = load_chatbot_tokenizer()

        encoded_input = chatbot_tokenizer(user_question, padding=True, truncation=True, return_tensors='pt')  

        with torch.no_grad():
            input_output = chatbot_model(**encoded_input)

        input_embeddings = mean_pooling(input_output, encoded_input['attention_mask']) 
        input_embeddings_array = input_embeddings.numpy()
        final_input_data = input_embeddings_array.reshape(-1,)

        chatbot_data["cosin"] = chatbot_data["embedding"].map(lambda x : cosine_similarity([final_input_data],[x]).squeeze())


        if chatbot_data["cosin"].max() < 0.60 :
            # 사전 제약조건 + 유저의 입력
            prompt = return_guide() + user_question

            # 간혹 GPT 응답 오류 처리 
            try : 
                response = chatGPT( prompt )
            
            except : 
                answer = "잠시 문제가 발생했습니다. 다시 입력해주세요."
                return answer 

            answer = response["choices"][0]["message"]["content"]

            temp_dict = {"question" : user_question, 
                         "answer" : answer, 
                         "embedding" : [final_input_data] }
            
            temp_df = pd.DataFrame(temp_dict)

            # GPT에서 생성된 대화를 챗봇 데이터에 추가 
            origin_chatbot_data = pd.concat([origin_chatbot_data, temp_df], ignore_index=True)

            path = os.path.join(os.getcwd(), 'data', 'chatbot_data_test.pkl')
            origin_chatbot_data.to_pickle(path)

            # 답변 반환
            return answer 

    else :
         answer = "챗봇이 잠시 쉬러갔어요. 금방 돌아올게요!"

    temp = chatbot_data.sort_values(["cosin"], ascending=False)[0:1]
    answer = ''.join([x for x in temp["answer"]])

    return answer