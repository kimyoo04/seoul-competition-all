package com.seoul_competition.senior_jobtraining.domain.education.dto.response.Recommend;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.text.DecimalFormat;
import java.time.LocalDate;
import lombok.Getter;

@Getter
public class RecommendationEducationsDto {

  private Long id;
  private String name;
  private String status;
  private String price;
  private Integer capacity;
  @JsonFormat(pattern = "yyyy.MM.dd")
  private LocalDate registerStart;
  @JsonFormat(pattern = "yyyy.MM.dd")
  private LocalDate registerEnd;
  @JsonFormat(pattern = "yyyy.MM.dd")
  private LocalDate educationStart;
  @JsonFormat(pattern = "yyyy.MM.dd")
  private LocalDate educationEnd;
  private String url;
  private Long hits;

  public RecommendationEducationsDto(Long id, String name, String status, String price,
      Integer capacity, LocalDate registerStart, LocalDate registerEnd, LocalDate educationStart,
      LocalDate educationEnd, String url, Long hits) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.price = new DecimalFormat("###,###").format(Integer.parseInt(price));
    this.capacity = capacity;
    this.registerStart = registerStart;
    this.registerEnd = registerEnd;
    this.educationStart = educationStart;
    this.educationEnd = educationEnd;
    this.url = url;
    this.hits = hits;
  }
}
