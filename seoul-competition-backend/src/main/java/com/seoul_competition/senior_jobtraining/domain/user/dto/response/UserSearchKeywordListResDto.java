package com.seoul_competition.senior_jobtraining.domain.user.dto.response;

import java.util.List;

public record UserSearchKeywordListResDto(
    List<UserSearchKeywordResDto> data,
    boolean user
) {

}
