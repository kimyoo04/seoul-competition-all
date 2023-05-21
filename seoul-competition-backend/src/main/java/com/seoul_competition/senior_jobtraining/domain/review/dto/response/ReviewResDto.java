package com.seoul_competition.senior_jobtraining.domain.review.dto.response;

import com.seoul_competition.senior_jobtraining.domain.review.entity.Review;
import java.time.LocalDateTime;

public record ReviewResDto(
    Long id,
    String nickname,
    String content,
    LocalDateTime createdAt) {

  public ReviewResDto(Review review) {
    this(review.getId(), review.getNickname(), review.getContent(),
        review.getCreatedAt());
  }
}
