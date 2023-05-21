package com.seoul_competition.senior_jobtraining.domain.comment.dto.response;

import com.seoul_competition.senior_jobtraining.domain.comment.entity.Comment;
import java.time.LocalDateTime;

public record CommentResDto(Long id,
                            String nickname,
                            String content,
                            LocalDateTime createdAt) {

  public static CommentResDto of(Long id, String nickname, String content,
      LocalDateTime createdAt) {
    return new CommentResDto(id, nickname, content, createdAt);
  }

  public static CommentResDto from(Comment comment) {
    return new CommentResDto(
        comment.getId(),
        comment.getNickname(),
        comment.getContent(),
        comment.getCreatedAt()
    );
  }
}
