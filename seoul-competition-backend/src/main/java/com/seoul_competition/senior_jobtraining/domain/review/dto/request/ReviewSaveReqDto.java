package com.seoul_competition.senior_jobtraining.domain.review.dto.request;

import com.seoul_competition.senior_jobtraining.domain.education.entity.Education;
import com.seoul_competition.senior_jobtraining.domain.review.entity.Review;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ReviewSaveReqDto(
    @NotNull(message = "교육 번호를 입력해주세요.") Long educationId,
    @NotBlank(message = "닉네임을 입력해주세요.") String nickname,
    @NotBlank(message = "비밀번호를 입력해주세요.") String password,
    @NotBlank(message = "댓글을 입력해주세요.") String content
) {

  public Review toEntity(Education education) {
    return Review.builder()
        .education(education)
        .nickname(nickname)
        .password(password)
        .content(content)
        .build();
  }
}
