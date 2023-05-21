package com.seoul_competition.senior_jobtraining.global.scheduler.dto;

import com.seoul_competition.senior_jobtraining.domain.chat.entity.ChatHistory;
import java.time.LocalDateTime;

public record ChatHistoryMonthReqDto(
    Long id,
    String question,
    String answer,
    Boolean feedback,
    LocalDateTime createdAt
) {

  public static ChatHistoryMonthReqDto from(ChatHistory chatHistory) {
    return new ChatHistoryMonthReqDto(chatHistory.getId(), chatHistory.getQuestion(),
        chatHistory.getAnswer(), chatHistory.getFeedback(), chatHistory.getCreatedAt());
  }
}
