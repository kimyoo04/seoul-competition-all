package com.seoul_competition.senior_jobtraining.domain.user.dto;

import com.seoul_competition.senior_jobtraining.domain.user.entity.BoardCategory;
import com.seoul_competition.senior_jobtraining.domain.user.entity.UserDetail;
import io.jsonwebtoken.Claims;

public record UserDetailSaveDto(
    BoardCategory category,
    String gender,
    String age,
    String location,
    String interest,
    Long postId
) {

  public static UserDetailSaveDto from(Claims claims, Long postId, BoardCategory boardCategory) {
    return new UserDetailSaveDto(
        boardCategory,
        claims.get("gender").toString(),
        claims.get("age").toString(),
        claims.get("location").toString(),
        claims.get("interest").toString(),
        postId
    );
  }

  public UserDetail toEntity() {
    return UserDetail.builder()
        .boardCategory(category)
        .gender(gender)
        .age(age)
        .location(location)
        .interest(interest)
        .postId(postId)
        .build();
  }
}
