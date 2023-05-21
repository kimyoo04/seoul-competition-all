package com.seoul_competition.senior_jobtraining.domain.post.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;

import com.seoul_competition.senior_jobtraining.domain.post.dao.PostRepository;
import com.seoul_competition.senior_jobtraining.domain.post.dto.request.PostSearchReqDto;
import com.seoul_competition.senior_jobtraining.domain.post.dto.request.PostUpdateReqDto;
import com.seoul_competition.senior_jobtraining.domain.post.dto.response.PostDetailResDto;
import com.seoul_competition.senior_jobtraining.domain.post.dto.response.PostListResponse;
import com.seoul_competition.senior_jobtraining.domain.post.entity.Post;
import java.time.LocalDateTime;
import java.util.Optional;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@ExtendWith(MockitoExtension.class)
class PostServiceTest {

  @Mock
  private PostRepository postRepository;

  @InjectMocks
  private PostService postService;

  @Disabled
  @DisplayName("검색어 없이 게시글을 검색하면, 게시글 페이지를 반환한다.")
  @Test
  void givenNoSearchParameters_whenSearchingPosts_thenReturnPostPage() {
    // Given
    Pageable pageable = PageRequest.of(0, 20);
    given(postRepository.findAll(pageable)).willReturn(Page.empty());

    // When
    PostListResponse posts = postService.getPosts(pageable, new PostSearchReqDto(null, null, null),
        false);

    // Then
    assertThat(posts.getData()).isEmpty();
    then(postRepository).should().findAll(pageable);
  }

  @DisplayName("게시글 ID로 조회하면, 댓글 달린 게시글을 반환한다.")
  @Test
  void givenPostId_whenPostWithComments_thenReturnPostWithComments() {
    // Given
    Long postId = 0L;
    Post post = createPost();
    given(postRepository.findById(postId)).willReturn(Optional.of(post));
    boolean isCookie = false;

    // When
    PostDetailResDto dto = postService.getPost(postId, false);

    // Then
    assertThat(dto)
        .hasFieldOrPropertyWithValue("nickname", post.getNickname())
        .hasFieldOrPropertyWithValue("title", post.getTitle())
        .hasFieldOrPropertyWithValue("content", post.getContent())
        .hasFieldOrPropertyWithValue("hits", post.getHits());
    then(postRepository).should().findById(postId);
  }

  @DisplayName("게시글의 수정 정보를 입력하면, 게시글을 수정한다.")
  @Test
  void givenModifiedPostInfo_whenUpdatingPost_thenUpdatesPost() {
    // Given
    Post post = createPost();
    PostUpdateReqDto dto = createPostUpdateReqDto("nickname", "1234", "새 타이틀", "새 내용");
    given(postRepository.findById(anyLong())).willReturn(Optional.ofNullable(post));

    // When
    postService.update(1L, dto);

    // Then
    assertThat(post)
        .hasFieldOrPropertyWithValue("nickname", dto.nickname())
        .hasFieldOrPropertyWithValue("title", dto.title())
        .hasFieldOrPropertyWithValue("content", dto.content());
    then(postRepository).should().findById(1L);
  }

  @DisplayName("게시글의 ID를 입력하면, 게시글을 삭제한다")
  @Test
  void givenPostId_whenDeletingPost_thenDeletesPost() {
    // Given
    Long postId = 1L;
    Post post = createPost();
    given(postRepository.findById(eq(postId))).willReturn(Optional.of(post));

    // When
    postService.delete(postId, "1234");

    // Then
    then(postRepository).should().delete(post);
  }


  private PostUpdateReqDto createPostUpdateReqDto(String nickname, String password, String title,
      String content) {
    return PostUpdateReqDto.of(nickname, password, title, content);
  }

  private Post createPost() {
    return Post.builder().nickname("nickname").password("1234").title("title")
        .content("content").hits(0L).createdAt(
            LocalDateTime.now()).updatedAt(LocalDateTime.now()).build();
  }
}