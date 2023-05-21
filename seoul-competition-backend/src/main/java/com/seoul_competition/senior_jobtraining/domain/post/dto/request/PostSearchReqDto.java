package com.seoul_competition.senior_jobtraining.domain.post.dto.request;

import java.time.LocalDate;

public record PostSearchReqDto(
    String name,
    LocalDate startDate,

    LocalDate endDate) {

}
