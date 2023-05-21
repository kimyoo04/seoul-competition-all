from fastapi import APIRouter
from pydantic import BaseModel
from recommend import model_update, user_recommend

router = APIRouter()


class TSearchKeyword(BaseModel):
    searchKeyword: str


class TEducationId (BaseModel):
    educationId: int


@router.post("/searchKeyword")
def recommend_by_keyword(data: TSearchKeyword):
    model_update.check_model_data() # 모델 파일 유무 확인 및 없으면 생성

    results = user_recommend.edu_recommend(data.searchKeyword)
    return {"results": results}


@router.post("/educationId")
def recommend_by_educationId(data: TEducationId):
    model_update.check_model_data() # 모델 파일 유무 확인 및 없으면 생성

    results = user_recommend.id_edu_recommend(data.educationId)
    return {"results": results}
