# base image 설정
FROM nginx:alpine

# 템플릿 파일 생성 및 복사
# RUN mkdir /etc/nginx/templates
# COPY default.conf.template /etc/nginx/templates

# config 파일 컨테이너 디렉토리로 덮어씌우기
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf

# 컨테이너 포트번호 지정
EXPOSE 80

# 서버 실행
CMD ["nginx", "-g", "daemon off;"]