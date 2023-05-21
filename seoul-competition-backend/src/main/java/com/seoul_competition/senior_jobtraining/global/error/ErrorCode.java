package com.seoul_competition.senior_jobtraining.global.error;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

  POST_NOT_EXISTS("해당 게시글은 존재하지 않습니다.", HttpStatus.BAD_REQUEST),
  COMMENT_NOT_EXISTS("해당 댓글은 존재하지 않습니다.", HttpStatus.BAD_REQUEST),
  PASSWORD_MISMATCH("비밀번호가 일치하지 않습니다.", HttpStatus.BAD_REQUEST),
  PAGE_NOT_FOUND("페이지를 찾을 수 없습니다.", HttpStatus.BAD_REQUEST),
  EDUCATION_NOT_EXISTS("해당 교육은 존재하지 않습니다.", HttpStatus.BAD_REQUEST),
  REVIEW_NOT_EXISTS("해당 리뷰는 존재하지 않습니다.", HttpStatus.BAD_REQUEST),
  PASSWORD_EMPTY("비밀번호를 입력해주세요", HttpStatus.BAD_REQUEST),
  CHAT_NOT_EXISTS("채팅이 존재하지 않습니다.", HttpStatus.BAD_REQUEST);

  private String message;
  private HttpStatus httpStatus;

  ErrorCode(String message, HttpStatus httpStatus) {
    this.message = message;
    this.httpStatus = httpStatus;
  }
}
