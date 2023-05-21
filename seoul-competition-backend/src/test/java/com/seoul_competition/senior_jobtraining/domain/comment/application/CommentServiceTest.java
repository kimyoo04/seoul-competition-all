package com.seoul_competition.senior_jobtraining.domain.comment.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.seoul_competition.senior_jobtraining.domain.comment.dao.CommentRepository;
import com.seoul_competition.senior_jobtraining.domain.comment.dto.request.CommentSaveReqDto;
import com.seoul_competition.senior_jobtraining.domain.comment.dto.request.CommentUpdateReqDto;
import com.seoul_competition.senior_jobtraining.domain.comment.entity.Comment;
import com.seoul_competition.senior_jobtraining.domain.post.dao.PostRepository;
import com.seoul_competition.senior_jobtraining.domain.post.entity.Post;
import com.seoul_competition.senior_jobtraining.global.error.ErrorCode;
import com.seoul_competition.senior_jobtraining.global.error.exception.BusinessException;
import com.seoul_competition.senior_jobtraining.global.error.exception.EntityNotFoundException;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class CommentServiceTest {

  @Mock
  private CommentRepository commentRepository;

  @Mock
  private PostRepository postRepository;

  @InjectMocks
  private CommentService commentService;

  @DisplayName("댓글 정보를 입력하면, 댓글을 저장한다.")
  @Test
  void givenPostCommentInfo_whenSavingPostComment_thenSavesPostComment() {
    // Given
    CommentSaveReqDto dto = createCommentSaveReqDto(1L, "nickname", "password", "content");
    given(postRepository.findById(dto.postId())).willReturn(Optional.ofNullable(createPost()));
    given(commentRepository.save(any(Comment.class))).willReturn(null);

    // When
    commentService.create(dto);

    // Then
    then(postRepository).should().findById(dto.postId());
    then(commentRepository).should().save(any(Comment.class));
  }

  @DisplayName("댓글 저장을 시도했는데 맞는 게시글이 없으면, EntityNotFoundException을 던진다.")
  @Test
  void givenNonexistentPost_whenSavingPostComment_thenThrowsEntityNotFoundException() {
    // Given
    CommentSaveReqDto dto = createCommentSaveReqDto(1L, "nickname", "password", "content");
    given(postRepository.findById(dto.postId())).willReturn(Optional.empty());

    // When, Then
    assertThrows(EntityNotFoundException.class, () -> commentService.create(dto));
  }

  @DisplayName("댓글 정보를 입력하면, 댓글을 수정한다.")
  @Test
  void givenPostCommentInfo_whenUpdatingPostComment_thenUpdatesPostComment() {
    // Given
    Long commentId = 1L;
    Comment comment = createComment(commentId, "password", "content");
    CommentUpdateReqDto dto = createCommentUpdateReqDto("modifyNickname", "password",
        "updated content");
    given(commentRepository.findById(commentId)).willReturn(Optional.ofNullable(comment));
    Mockito.lenient().when(commentRepository.save(any(Comment.class))).thenReturn(null);

    // When
    commentService.update(commentId, dto);

    // Then
    then(commentRepository).should().findById(commentId);
    assertThat(comment.getContent()).isEqualTo(dto.content());
  }

  @DisplayName("댓글이 존재하지 않으면, EntityNotFoundException이 발생한다.")
  @Test
  void givenNonexistentCommentId_whenUpdatingPostComment_thenThrowsEntityNotFoundException() {
    // Given
    Long nonExistentCommentId = 999L;
    CommentUpdateReqDto dto = createCommentUpdateReqDto("modifyNickname", "password",
        "updated content");
    given(commentRepository.findById(nonExistentCommentId)).willReturn(Optional.empty());

    // When, Then
    assertThrows(EntityNotFoundException.class,
        () -> commentService.update(nonExistentCommentId, dto));
  }

  @DisplayName("비밀번호가 일치하지 않으면, BusinessException이 발생한다.")
  @Test
  void givenIncorrectPassword_whenUpdatingPostComment_thenThrowsException() {
    // Given
    Long commentId = 1L;
    Comment comment = createComment(commentId, "password", "content");
    CommentUpdateReqDto dto = createCommentUpdateReqDto("modifyNickname", "wrong_password",
        "updated content");
    given(commentRepository.findById(commentId)).willReturn(Optional.ofNullable(comment));

    // When, Then
    assertThatThrownBy(() -> commentService.update(commentId, dto))
        .isInstanceOf(BusinessException.class)
        .hasMessageContaining(ErrorCode.PASSWORD_MISMATCH.getMessage());
  }

  @DisplayName("댓글 정보와 비밀번호를 입력하면, 댓글을 삭제한다.")
  @Test
  void givenCommentInfoAndPassword_whenDeletingComment_thenDeletesComment() {
    // Given
    Long commentId = 1L;
    Comment comment = createComment(commentId, "password", "content");
    given(commentRepository.findById(commentId)).willReturn(Optional.ofNullable(comment));

    // When
    commentService.delete(commentId, "password");

    // Then
    verify(commentRepository, times(1)).delete(comment);
  }

  @DisplayName("삭제하려는 댓글이 없을경우, EntityNotFoundException이 발생한다.")
  @Test
  void givenNonExistingCommentId_whenDeletingPostComment_thenThrowEntityNotFoundException() {
    // Given
    Long commentId = 1L;
    String password = "password";
    given(commentRepository.findById(commentId)).willReturn(Optional.empty());

    // When, Then
    EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> {
      commentService.delete(commentId, password);
    });

    assertThat(exception.getErrorCode()).isEqualTo(ErrorCode.COMMENT_NOT_EXISTS);
    verify(commentRepository, times(1)).findById(commentId);
    verify(commentRepository, never()).delete(any());
  }

  @DisplayName("댓글 삭제시 입력한 비밀번호가 댓글의 비밀번호와 일치하지 않으면 BusinessException이 발생한다.")
  @Test
  void givenExistingPostCommentIdAndIncorrectPassword_whenDeletingPostComment_thenThrowsBusinessException() {
    // Given
    Long commentId = 1L;
    Comment comment = createComment(commentId, "password", "content");
    given(commentRepository.findById(commentId)).willReturn(Optional.of(comment));

    // When, Then
    assertThrows(BusinessException.class, () -> commentService.delete(commentId, "wrong_password"));
  }


  private CommentUpdateReqDto createCommentUpdateReqDto(String nickname, String password,
      String updatedContent) {
    return CommentUpdateReqDto.of(nickname, password, updatedContent);
  }

  private Comment createComment(Long commentId, String password, String content) {
    return Comment.builder().nickname("nickname").password(password).content(content).build();
  }

  private CommentSaveReqDto createCommentSaveReqDto(Long postId, String nickname, String password,
      String content) {
    return CommentSaveReqDto.of(postId, nickname, password, content);
  }

  private Post createPost() {
    return Post.builder().nickname("nickname").password("password").title("title")
        .content("content").hits(0L).build();
  }
}