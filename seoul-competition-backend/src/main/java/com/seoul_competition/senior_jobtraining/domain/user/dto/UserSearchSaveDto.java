package com.seoul_competition.senior_jobtraining.domain.user.dto;

import com.seoul_competition.senior_jobtraining.domain.user.entity.BoardCategory;
import com.seoul_competition.senior_jobtraining.domain.user.entity.UserSearch;
import io.jsonwebtoken.Claims;

public record UserSearchSaveDto(
    BoardCategory category,
    String gender,
    String age,
    String location,
    String interest,
    String keyword
) {

  public UserSearch toEntity() {
    return UserSearch.builder()
        .category(category)
        .gender(gender)
        .age(age)
        .location(location)
        .interest(interest)
        .keyword(keyword)
        .build();
  }

  public static UserSearchSaveDto from(Claims claims, String searchValue,
      BoardCategory boardCategory) {
    return new UserSearchSaveDto(
        boardCategory,
        claims.get("gender").toString(),
        claims.get("age").toString(),
        claims.get("location").toString(),
        claims.get("interest").toString(),
        searchValue
    );
  }
}
