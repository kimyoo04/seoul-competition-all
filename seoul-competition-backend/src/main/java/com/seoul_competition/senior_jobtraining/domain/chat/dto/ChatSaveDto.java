package com.seoul_competition.senior_jobtraining.domain.chat.dto;

import com.seoul_competition.senior_jobtraining.domain.chat.dto.request.ChatQuestionReqDto;
import com.seoul_competition.senior_jobtraining.domain.chat.entity.ChatHistory;

public record ChatSaveDto(
    String question,
    String answer
) {

  public static ChatSaveDto of(ChatQuestionReqDto questionReqDto,
      String answer) {
    return new ChatSaveDto(questionReqDto.question(), answer);
  }

  public ChatHistory toEntity() {
    return ChatHistory.builder()
        .question(question)
        .answer(answer)
        .build();
  }
}
