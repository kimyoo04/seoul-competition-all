package com.seoul_competition.senior_jobtraining.domain.review.application;

import com.seoul_competition.senior_jobtraining.domain.education.dao.EducationRepository;
import com.seoul_competition.senior_jobtraining.domain.education.entity.Education;
import com.seoul_competition.senior_jobtraining.domain.review.dao.ReviewRepository;
import com.seoul_competition.senior_jobtraining.domain.review.dto.request.ReviewSaveReqDto;
import com.seoul_competition.senior_jobtraining.domain.review.dto.request.ReviewUpdateReqDto;
import com.seoul_competition.senior_jobtraining.domain.review.entity.Review;
import com.seoul_competition.senior_jobtraining.global.error.ErrorCode;
import com.seoul_competition.senior_jobtraining.global.error.exception.BusinessException;
import com.seoul_competition.senior_jobtraining.global.error.exception.EntityNotFoundException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Getter
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReviewService {

  private final ReviewRepository reviewRepository;
  private final EducationRepository educationRepository;

  @Transactional
  public void create(ReviewSaveReqDto reqDto) {
    Education education = educationRepository.findById(reqDto.educationId())
        .orElseThrow(() -> new EntityNotFoundException(ErrorCode.EDUCATION_NOT_EXISTS));

    reviewRepository.save(reqDto.toEntity(education));
  }

  @Transactional
  public void update(Long reviewId, ReviewUpdateReqDto reqDto) {

    Review review = reviewRepository.findById(reviewId)
        .orElseThrow(() -> new EntityNotFoundException(ErrorCode.REVIEW_NOT_EXISTS));

    review.checkPassword(reqDto.password());

    review.update(reqDto.nickname(), reqDto.content());
  }

  @Transactional
  public void delete(Long reviewId, String password) {
    Review review = reviewRepository.findById(reviewId)
        .orElseThrow(() -> new EntityNotFoundException(ErrorCode.REVIEW_NOT_EXISTS));
    review.checkPassword(password);
    reviewRepository.delete(review);

  }

  public void matchCheck(Long reviewId, String password) {
    if (StringUtils.isBlank(password)) {
      throw new BusinessException(ErrorCode.PASSWORD_EMPTY);
    }
    Review review = reviewRepository.findById(reviewId).orElseThrow(
        () -> new EntityNotFoundException(
            ErrorCode.COMMENT_NOT_EXISTS));
    review.checkPassword(password);
  }
}
