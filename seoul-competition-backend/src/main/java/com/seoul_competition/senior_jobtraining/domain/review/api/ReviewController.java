package com.seoul_competition.senior_jobtraining.domain.review.api;

import com.seoul_competition.senior_jobtraining.domain.review.application.ReviewService;
import com.seoul_competition.senior_jobtraining.domain.review.dto.request.ReviewSaveReqDto;
import com.seoul_competition.senior_jobtraining.domain.review.dto.request.ReviewUpdateReqDto;
import jakarta.validation.Valid;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/review")
public class ReviewController {

  private final ReviewService reviewService;

  @PostMapping
  public ResponseEntity<Void> createReview(@RequestBody @Valid ReviewSaveReqDto reqDto) {
    reviewService.create(reqDto);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @PutMapping("/{reviewId}")
  public ResponseEntity<Void> updateReview(@RequestBody @Valid ReviewUpdateReqDto reqDto,
      @PathVariable Long reviewId) {
    reviewService.update(reviewId, reqDto);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @DeleteMapping("/{reviewId}")
  public ResponseEntity<Void> deleteReview(@RequestBody Map<String, String> password,
      @PathVariable Long reviewId) {
    reviewService.delete(reviewId, password.get("password"));
    return ResponseEntity.noContent().build();
  }

  @PostMapping("/{reviewId}/matchCheck")
  public ResponseEntity<Void> matchCheck(@PathVariable Long reviewId,
      @RequestBody Map<String, String> password) {
    reviewService.matchCheck(reviewId, password.get("password"));
    return ResponseEntity.noContent().build();
  }
}
