package com.seoul_competition.senior_jobtraining.domain.comment.dto.request;

import com.seoul_competition.senior_jobtraining.domain.comment.entity.Comment;
import com.seoul_competition.senior_jobtraining.domain.post.entity.Post;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CommentSaveReqDto(
    @NotNull(message = "게시글 번호를 입력해주세요.") Long postId,
    @NotBlank(message = "닉네임을 입력해주세요.") String nickname,
    @NotBlank(message = "비밀번호를 입력해주세요.") String password,
    @NotBlank(message = "댓글을 입력해주세요.") String content
) {

  public static CommentSaveReqDto of(Long postId, String nickname, String password,
      String content) {
    return new CommentSaveReqDto(postId, nickname, password, content);
  }

  public Comment toEntity(Post post) {
    return Comment.builder()
        .post(post)
        .nickname(nickname)
        .password(password)
        .content(content)
        .build();
  }
}
