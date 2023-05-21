package com.seoul_competition.senior_jobtraining.domain.education.dto.response.Recommend;

import java.util.List;

public record RecommendationEducationsResponse(List<RecommendationEducationsDto> data) {

  public static RecommendationEducationsResponse of(
      List<RecommendationEducationsDto> recommendationEducationsDto) {
    return new RecommendationEducationsResponse(recommendationEducationsDto);
  }
}
