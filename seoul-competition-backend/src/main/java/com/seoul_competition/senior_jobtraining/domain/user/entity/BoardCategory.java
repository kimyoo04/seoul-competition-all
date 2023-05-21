package com.seoul_competition.senior_jobtraining.domain.user.entity;

public enum BoardCategory {
  FREE(0),
  EDUCATION(1);

  private final int value;

  BoardCategory(int value) {
    this.value = value;
  }

  public int getValue() {
    return value;
  }
}
