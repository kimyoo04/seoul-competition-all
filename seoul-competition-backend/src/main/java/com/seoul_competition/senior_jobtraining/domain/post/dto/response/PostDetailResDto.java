package com.seoul_competition.senior_jobtraining.domain.post.dto.response;

import com.seoul_competition.senior_jobtraining.domain.comment.dto.response.CommentResDto;
import com.seoul_competition.senior_jobtraining.domain.comment.entity.Comment;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public record PostDetailResDto(
    Long id,
    String nickname,
    String title,
    String content,
    LocalDateTime createdAt,
    Long hits,
    List<CommentResDto> comments,
    boolean user
) {

  public static PostDetailResDto of(Long id, String nickname, String title, String content,
      LocalDateTime createdAt, Long hits, List<Comment> comments, boolean user) {
    List<CommentResDto> commentResDtos = comments.stream()
        .map(CommentResDto::from)
        .collect(Collectors.toList());
    return new PostDetailResDto(id, nickname, title, content, createdAt, hits, commentResDtos,
        user);
  }

  public PostDetailResDto withUser(boolean user) {
    return new PostDetailResDto(id, nickname, title, content, createdAt, hits, comments, user);
  }
}
