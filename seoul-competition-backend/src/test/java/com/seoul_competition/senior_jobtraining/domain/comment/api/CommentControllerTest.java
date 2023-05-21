package com.seoul_competition.senior_jobtraining.domain.comment.api;

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.MOCK;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seoul_competition.senior_jobtraining.domain.comment.dao.CommentRepository;
import com.seoul_competition.senior_jobtraining.domain.comment.dto.request.CommentSaveReqDto;
import com.seoul_competition.senior_jobtraining.domain.comment.dto.request.CommentUpdateReqDto;
import com.seoul_competition.senior_jobtraining.domain.comment.entity.Comment;
import com.seoul_competition.senior_jobtraining.domain.post.dao.PostRepository;
import com.seoul_competition.senior_jobtraining.domain.post.entity.Post;
import jakarta.persistence.EntityManager;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

@AutoConfigureMockMvc
@Sql("classpath:db/teardown.sql")
@SpringBootTest(webEnvironment = MOCK)
class CommentControllerTest {

  @Autowired
  private MockMvc mvc;

  @Autowired
  private ObjectMapper om;

  @Autowired
  private PostRepository postRepository;

  @Autowired
  private CommentRepository commentRepository;

  @Autowired
  private EntityManager em;

  @BeforeEach
  public void setUp() {
    dataSetting();
    em.clear();
  }

  private void dataSetting() {
    Post post1 = postRepository.save(
        Post.builder().nickname("nickname1").password("1234").title("title1").content("content1")
            .hits(0L).build());
    Post post2 = postRepository.save(
        Post.builder().nickname("nickname2").password("1234").title("title2").content("content2")
            .hits(1L).build());
    commentRepository.save(
        Comment.builder().nickname("testnickname").password("1234").content("content").post(post1)
            .build());
  }

  @DisplayName("[POST] 댓글 등록 - 정상호출")
  @Test
  void givenCommentInfo_whenRequesting_thenSavesComment() throws Exception {
    // given
    CommentSaveReqDto reqDto = CommentSaveReqDto.of(1L, "nickname", "password", "content");

    // when
    ResultActions resultActions = mvc.perform(post("/api/v1/comment")
        .contentType(MediaType.APPLICATION_JSON)
        .content(new ObjectMapper().writeValueAsString(reqDto)));

    // then
    resultActions.andExpect(status().isCreated());
  }

  @DisplayName("[POST] 댓글 등록 - 실패: 존재하지 않는 게시물")
  @Test
  void givenNonExistentPostId_whenRequesting_thenReturnsBadRequest() throws Exception {
    // given
    CommentSaveReqDto reqDto = CommentSaveReqDto.of(999L, "nickname", "password", "content");

    // when
    ResultActions resultActions = mvc.perform(post("/api/v1/comment")
        .contentType(MediaType.APPLICATION_JSON)
        .content(new ObjectMapper().writeValueAsString(reqDto)));

    // then
    resultActions.andExpect(status().isBadRequest());
  }

  @DisplayName("[PUT] 댓글 수정 - 정상호출")
  @Test
  void givenCommentInfo_whenUpdating_thenUpdatesComment() throws Exception {
    // given
    Long commentId = 1L;
    CommentUpdateReqDto reqDto = CommentUpdateReqDto.of("modifyNickname", "1234",
        "updated content");

    // when
    ResultActions resultActions = mvc.perform(put("/api/v1/comment/" + commentId, 1L)
        .contentType(MediaType.APPLICATION_JSON)
        .content(new ObjectMapper().writeValueAsString(reqDto)));

    // then
    resultActions.andExpect(status().isCreated());
  }

  @DisplayName("[PUT] 댓글 수정 - 실패: 올바르지 않은 비밀번호")
  @Test
  void givenIncorrectPassword_whenUpdating_thenReturnsBadRequest() throws Exception {
    // given
    Long commentId = 1L;
    CommentUpdateReqDto reqDto = CommentUpdateReqDto.of("modifyNickname", "incorrectpassword",
        "updated content");

    // when
    ResultActions resultActions = mvc.perform(
        post("/api/v1/comment/" + commentId + "/matchCheck", 1L)
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(reqDto)));

    // then
    resultActions.andExpect(status().isBadRequest());
  }

  @DisplayName("[DELETE] 댓글 삭제 - 정상호출")
  @Test
  void givenCommentInfo_whenDeleting_thenDeletesComment() throws Exception {
    // given
    Long commentId = 1L;
    Map<String, String> password = new HashMap<>();
    password.put("password", "1234");

    // when
    ResultActions resultActions = mvc.perform(delete("/api/v1/comment/" + commentId, 1L)
        .contentType(MediaType.APPLICATION_JSON)
        .content(new ObjectMapper().writeValueAsString(password)));

    // then
    resultActions.andExpect(status().isNoContent());
  }

  @DisplayName("[DELETE] 댓글 삭제 - 실패: 올바르지 않은 비밀번호")
  @Test
  void givenIncorrectPassword_whenDeleting_thenReturnsBadRequest() throws Exception {
    // given
    Long commentId = 1L;
    Map<String, String> password = new HashMap<>();
    password.put("password", "incorrectpassword");

    // when
    ResultActions resultActions = mvc.perform(delete("/api/v1/comment/" + commentId, 1L)
        .contentType(MediaType.APPLICATION_JSON)
        .content(new ObjectMapper().writeValueAsString(password)));

    // then
    resultActions.andExpect(status().isBadRequest());
  }

  @DisplayName("[DELETE] 댓글 삭제 - 실패: 존재하지 않는 댓글")
  @Test
  void givenNonExistentCommentId_whenDeleting_thenReturnsBadRequest() throws Exception {
    // given
    Long commentId = 999L;
    Map<String, String> password = new HashMap<>();
    password.put("password", "1234");

    // when
    ResultActions resultActions = mvc.perform(delete("/api/v1/comment/" + commentId, 1L)
        .contentType(MediaType.APPLICATION_JSON)
        .content(new ObjectMapper().writeValueAsString(password)));

    // then
    resultActions.andExpect(status().isBadRequest());
  }
}