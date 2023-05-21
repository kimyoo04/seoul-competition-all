package com.seoul_competition.senior_jobtraining.domain.post.dto.response;

import com.seoul_competition.senior_jobtraining.domain.post.entity.Post;
import java.time.LocalDateTime;

public record PostRankResDto(
    Long id,
    String title,
    Long hits,
    Long commentsCount) {

  public PostRankResDto(Post post) {
    this(post.getId(), post.getTitle(), post.getHits(), (long) post.getComments().size());
  }
}
