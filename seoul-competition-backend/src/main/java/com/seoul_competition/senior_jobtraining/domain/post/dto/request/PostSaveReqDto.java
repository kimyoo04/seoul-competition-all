package com.seoul_competition.senior_jobtraining.domain.post.dto.request;

import com.seoul_competition.senior_jobtraining.domain.post.entity.Post;
import jakarta.validation.constraints.NotBlank;

public record PostSaveReqDto(
    @NotBlank(message = "게시글 닉네임을 입력해주세요.") String nickname,
    @NotBlank(message = "게시글 비밀번호를 입력해주세요.") String password,
    @NotBlank(message = "게시글 제목을 입력해주세요.") String title,
    @NotBlank(message = "게시글 본문을 입력해주세요.") String content,
    Long hits
) {

  public Post toEntity() {
    return Post.builder()
        .nickname(nickname)
        .password(password)
        .title(title)
        .content(content)
        .hits(0L)
        .build();
  }
}
