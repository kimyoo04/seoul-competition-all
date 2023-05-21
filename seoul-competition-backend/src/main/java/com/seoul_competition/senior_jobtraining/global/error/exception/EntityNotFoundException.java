package com.seoul_competition.senior_jobtraining.global.error.exception;


import com.seoul_competition.senior_jobtraining.global.error.ErrorCode;

public class EntityNotFoundException extends BusinessException {

  public EntityNotFoundException(ErrorCode errorCode) {
    super(errorCode);
  }
}
