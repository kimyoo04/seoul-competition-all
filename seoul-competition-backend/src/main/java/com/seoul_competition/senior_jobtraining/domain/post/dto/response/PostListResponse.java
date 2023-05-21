package com.seoul_competition.senior_jobtraining.domain.post.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostListResponse {

  private List<PostResDto> data;
  private int totalPages;
  private int currentPage;
  private Long totalCounts;
  private boolean user;
}
