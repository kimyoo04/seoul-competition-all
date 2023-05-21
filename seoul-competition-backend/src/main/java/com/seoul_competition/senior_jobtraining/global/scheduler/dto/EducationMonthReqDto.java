package com.seoul_competition.senior_jobtraining.global.scheduler.dto;

import com.seoul_competition.senior_jobtraining.domain.education.entity.Education;

public record EducationMonthReqDto(
    long id,
    String name,
    int price,
    String status,
    int capacity,
    String registerStart,
    String registerEnd,
    String educationsStart,
    String educationEnd,
    String url,
    Long hits
) {

  public static EducationMonthReqDto from(Education education) {
    return new EducationMonthReqDto(education.getId(), education.getName(),
        education.getPrice(), education.getStatus(), education.getCapacity(),
        education.getRegisterStart().toString(), education.getRegisterEnd().toString(),
        education.getEducationStart().toString(), education.getEducationEnd().toString(),
        education.getUrl(), education.getHits()
    );
  }
}
