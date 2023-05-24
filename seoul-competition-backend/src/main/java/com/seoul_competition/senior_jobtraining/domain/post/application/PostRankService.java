package com.seoul_competition.senior_jobtraining.domain.post.application;

import com.seoul_competition.senior_jobtraining.domain.post.dao.PostRepository;
import com.seoul_competition.senior_jobtraining.domain.post.dto.response.PostRankListResDto;
import com.seoul_competition.senior_jobtraining.domain.post.dto.response.PostRankResDto;
import com.seoul_competition.senior_jobtraining.domain.post.entity.Post;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostRankService {

  private final PostRepository postRepository;

  public PostRankListResDto getFiveByHits(boolean user) {
    List<Post> posts = postRepository.findTop5ByOrderByHitsDesc();
    List<PostRankResDto> resDtos = posts.stream()
        .map(PostRankResDto::new)
        .collect(Collectors.toList());

    return new PostRankListResDto(resDtos, user);
  }
}