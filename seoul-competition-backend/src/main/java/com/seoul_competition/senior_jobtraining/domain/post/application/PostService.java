package com.seoul_competition.senior_jobtraining.domain.post.application;

import com.querydsl.core.BooleanBuilder;
import com.seoul_competition.senior_jobtraining.domain.post.dao.PostRepository;
import com.seoul_competition.senior_jobtraining.domain.post.dto.request.PostSaveReqDto;
import com.seoul_competition.senior_jobtraining.domain.post.dto.request.PostSearchReqDto;
import com.seoul_competition.senior_jobtraining.domain.post.dto.request.PostUpdateReqDto;
import com.seoul_competition.senior_jobtraining.domain.post.dto.response.PostDetailResDto;
import com.seoul_competition.senior_jobtraining.domain.post.dto.response.PostListResponse;
import com.seoul_competition.senior_jobtraining.domain.post.dto.response.PostResDto;
import com.seoul_competition.senior_jobtraining.domain.post.entity.Post;
import com.seoul_competition.senior_jobtraining.domain.post.entity.QPost;
import com.seoul_competition.senior_jobtraining.global.error.ErrorCode;
import com.seoul_competition.senior_jobtraining.global.error.exception.BusinessException;
import com.seoul_competition.senior_jobtraining.global.error.exception.EntityNotFoundException;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

  private final PostRepository postRepository;

  @Transactional
  public Long savePost(PostSaveReqDto reqDto) {
    Post postPS = postRepository.save(reqDto.toEntity());
    return postPS.getId();
  }

  @Transactional
  public PostDetailResDto getPost(Long postId, boolean hasCookie) {
    Post post = postRepository.findById(postId).orElseThrow(
        () -> new EntityNotFoundException(
            ErrorCode.POST_NOT_EXISTS));

    post.addHits();

    return PostDetailResDto.of(post.getId(), post.getNickname(), post.getTitle(), post.getContent(),
        post.getCreatedAt(), post.getHits(), post.getComments(), hasCookie);
  }

  @Transactional
  public void update(Long postId, PostUpdateReqDto reqDto) {
    Post post = postRepository.findById(postId).orElseThrow(
        () -> new EntityNotFoundException(
            ErrorCode.POST_NOT_EXISTS));

    post.checkPassword(reqDto.password());

    post.update(reqDto.nickname(), reqDto.title(), reqDto.content());
  }

  @Transactional
  public void delete(Long postId, String password) {
    Post post = postRepository.findById(postId).orElseThrow(
        () -> new EntityNotFoundException(
            ErrorCode.POST_NOT_EXISTS));
    post.checkPassword(password);
    postRepository.delete(post);
  }

  public PostListResponse getPosts(Pageable pageable, PostSearchReqDto reqDto, boolean hasCookie) {
    BooleanBuilder builder = new BooleanBuilder();
    if (reqDto.startDate() != null) {
      builder.and(QPost.post.createdAt.goe(reqDto.startDate().atStartOfDay()));
    }
    if (reqDto.endDate() != null) {
      builder.and(QPost.post.createdAt.loe(reqDto.endDate().atTime(LocalTime.MAX)));
    }
    Page<Post> postPage;
    if (reqDto.name() != null && !reqDto.name().isEmpty() && reqDto.startDate() != null
        && reqDto.endDate() != null) {
      postPage = postRepository.findBySearchValueAndCreatedAtBetween(reqDto.name(),
          reqDto.startDate().atStartOfDay(), reqDto.endDate().atTime(LocalTime.MAX), pageable);
    } else if (reqDto.name() != null && !reqDto.name().isEmpty() && reqDto.startDate() == null) {
      postPage = postRepository.findByTitleOrContent(reqDto.name(), pageable);
    } else {
      postPage = postRepository.findAll(builder, pageable);
    }

    checkPageNumber(pageable, postPage);

    List<PostResDto> posts = postPage.getContent().stream().map(PostResDto::of)
        .collect(Collectors.toList());
    return new PostListResponse(posts, postPage.getTotalPages() - 1, postPage.getNumber(),
        postPage.getTotalElements(),
        hasCookie);
  }

  private void checkPageNumber(Pageable pageable, Page<Post> postPage) {
    if (pageable.getPageNumber() >= postPage.getTotalPages()) {
      throw new BusinessException(ErrorCode.PAGE_NOT_FOUND);
    }
  }


  public int getTotalPages(int size) {
    int totalCount = postRepository.getTotalCount();
    return (int) Math.ceil((double) totalCount / size);
  }

  public void matchCheck(Long postId, String password) {
    if (StringUtils.isBlank(password)) {
      throw new BusinessException(ErrorCode.PASSWORD_EMPTY);
    }
    Post post = postRepository.findById(postId).orElseThrow(
        () -> new EntityNotFoundException(
            ErrorCode.POST_NOT_EXISTS));
    post.checkPassword(password);
  }
}
