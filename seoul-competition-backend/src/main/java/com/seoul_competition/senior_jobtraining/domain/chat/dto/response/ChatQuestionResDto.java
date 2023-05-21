package com.seoul_competition.senior_jobtraining.domain.chat.dto.response;

public record ChatQuestionResDto(
    Long id,
    String answer
) {

  public static ChatQuestionResDto of(Long id, String answer) {
    return new ChatQuestionResDto(id, answer);
  }
}
