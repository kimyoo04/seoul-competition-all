package com.seoul_competition.senior_jobtraining.domain.education.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.seoul_competition.senior_jobtraining.domain.education.entity.Education;
import com.seoul_competition.senior_jobtraining.domain.review.dto.response.ReviewResDto;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public record EducationDetailResDto(
    Long id,
    String name,
    String status,

    String price,
    Integer capacity,
    @JsonFormat(pattern = "yyyy.MM.dd")
    LocalDate registerStart,
    @JsonFormat(pattern = "yyyy.MM.dd")
    LocalDate registerEnd,
    @JsonFormat(pattern = "yyyy.MM.dd")
    LocalDate educationStart,
    @JsonFormat(pattern = "yyyy.MM.dd")
    LocalDate educationEnd,
    String url,
    Long hits,
    List<ReviewResDto> reviews,
    boolean user) {

  public EducationDetailResDto(Education education, Boolean user) {
    this(education.getId(), education.getName(), education.getStatus(),
        new DecimalFormat("###,###").format(education.getPrice()),
        education.getCapacity(), education.getRegisterStart(), education.getRegisterEnd(),
        education.getEducationStart(), education.getEducationEnd(), education.getUrl(),
        education.getHits(),
        education.getReviews().stream().map(ReviewResDto::new).collect(Collectors.toList()),
        user = user);
  }
}
