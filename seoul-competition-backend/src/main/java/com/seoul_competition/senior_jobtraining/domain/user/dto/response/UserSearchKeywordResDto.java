package com.seoul_competition.senior_jobtraining.domain.user.dto.response;

public record UserSearchKeywordResDto(
    String keyword,
    int hits
) {

}
