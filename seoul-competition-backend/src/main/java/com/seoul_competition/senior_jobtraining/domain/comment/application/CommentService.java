package com.seoul_competition.senior_jobtraining.domain.comment.application;

import com.seoul_competition.senior_jobtraining.domain.comment.dao.CommentRepository;
import com.seoul_competition.senior_jobtraining.domain.comment.dto.request.CommentSaveReqDto;
import com.seoul_competition.senior_jobtraining.domain.comment.dto.request.CommentUpdateReqDto;
import com.seoul_competition.senior_jobtraining.domain.comment.entity.Comment;
import com.seoul_competition.senior_jobtraining.domain.post.dao.PostRepository;
import com.seoul_competition.senior_jobtraining.domain.post.entity.Post;
import com.seoul_competition.senior_jobtraining.global.error.ErrorCode;
import com.seoul_competition.senior_jobtraining.global.error.exception.BusinessException;
import com.seoul_competition.senior_jobtraining.global.error.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {

  private final PostRepository postRepository;
  private final CommentRepository commentRepository;

  @Transactional
  public void create(CommentSaveReqDto reqDto) {
    Post post = postRepository.findById(reqDto.postId())
        .orElseThrow(() -> new EntityNotFoundException(ErrorCode.POST_NOT_EXISTS));
    commentRepository.save(reqDto.toEntity(post));
  }

  @Transactional
  public void update(Long commentId, CommentUpdateReqDto reqDto) {

    Comment comment = commentRepository.findById(commentId)
        .orElseThrow(() -> new EntityNotFoundException(
            ErrorCode.COMMENT_NOT_EXISTS));

    comment.checkPassword(reqDto.password());
    comment.update(reqDto.nickname(), reqDto.content());
  }

  @Transactional
  public void delete(Long commentId, String password) {
    Comment comment = commentRepository.findById(commentId)
        .orElseThrow(() -> new EntityNotFoundException(ErrorCode.COMMENT_NOT_EXISTS));
    comment.checkPassword(password);
    commentRepository.delete(comment);
  }

  public void matchCheck(Long commentId, String password) {
    if (StringUtils.isBlank(password)) {
      throw new BusinessException(ErrorCode.PASSWORD_EMPTY);
    }
    Comment comment = commentRepository.findById(commentId).orElseThrow(
        () -> new EntityNotFoundException(
            ErrorCode.COMMENT_NOT_EXISTS));
    comment.checkPassword(password);
  }
}
