package com.seoul_competition.senior_jobtraining.domain.education.dto.response.Recommend;

public record RecommendationEducation(
    int id
) {

  public static Long from(RecommendationEducation item) {
    return (long) item.id;
  }
}
