package com.seoul_competition.senior_jobtraining.global.scheduler.dto;

import java.util.List;

public record ModelUpdateData(
    List<EducationMonthReqDto> educations,
    List<ChatHistoryMonthReqDto> chatHistories
) {

  public static ModelUpdateData of(List<EducationMonthReqDto> educations,
      List<ChatHistoryMonthReqDto> chatHistories) {
    return new ModelUpdateData(educations, chatHistories);
  }
}
