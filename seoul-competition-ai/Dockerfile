# BASE IMAGE
FROM python:3.10-slim

WORKDIR /usr/src/fastapi

# # transformer
RUN pip install transformers

# torch cpu
RUN pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# torch 2.0 gpu 버전
# RUN pip install torch --index-url https://download.pytorch.org/whl/cu118

# jvm 설치
RUN apt-get update && apt-get install -y default-jre

# requirements.txt 설치
COPY ./requirements.txt /usr/src/fastapi/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /usr/src/fastapi/requirements.txt

COPY ./ ./

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]