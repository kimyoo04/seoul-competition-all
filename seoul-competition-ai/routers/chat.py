from fastapi import APIRouter
from pydantic import BaseModel
from chat import chat

router = APIRouter()


class TChatQuestion(BaseModel):
    question: str

# 챗봇 모델 사전 로드 
# 챗봇 모델 체크를 여기서 하는 걸로 변경해주어야함.
def load_model() :
    chatbot_model = chat.load_chatbot_model()
    chatbot_model.eval()

    return chatbot_model

chatbot_model = load_model()

@router.post("/answer")
def predict(data: TChatQuestion):
    answer = chat.use_chatbot(data.question, chatbot_model)

    return {"answer": answer}
