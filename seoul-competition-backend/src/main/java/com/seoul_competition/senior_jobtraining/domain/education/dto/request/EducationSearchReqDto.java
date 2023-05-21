package com.seoul_competition.senior_jobtraining.domain.education.dto.request;

import java.time.LocalDate;

public record EducationSearchReqDto(
    String name,
    String status,
    LocalDate startDate,
    LocalDate endDate,
    Integer minPrice,
    Integer maxPrice) {

}
