package com.seoul_competition.senior_jobtraining.domain.comment.dto.request;

import jakarta.validation.constraints.NotBlank;

public record CommentUpdateReqDto(
    @NotBlank(message = "닉네임을 입력해주세요.") String nickname,
    @NotBlank(message = "비밀번호를 입력해주세요.") String password,
    @NotBlank(message = "내용이 비어있습니다.") String content) {

  public static CommentUpdateReqDto of(String nickname, String password, String updatedContent) {
    return new CommentUpdateReqDto(nickname, password, updatedContent);
  }
}
