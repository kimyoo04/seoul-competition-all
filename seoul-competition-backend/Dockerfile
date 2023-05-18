# Build Stage
FROM gradle:7.6-jdk17-alpine as BUILD

# 작업 디렉토리 설정
WORKDIR /home/gradle/src

# Gradle 파일 복사
COPY build.gradle settings.gradle ./
COPY gradle ./gradle

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN gradle clean build -x test

# Run Stage
FROM openjdk:17.0.2-jdk

# 작업 디렉토리 설정
WORKDIR /usr/app

# Build Stage에서 생성된 JAR 파일 복사
COPY --from=BUILD /home/gradle/src/build/libs/app.jar .

# 포트 노출
EXPOSE 8080

# 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "app.jar"]
