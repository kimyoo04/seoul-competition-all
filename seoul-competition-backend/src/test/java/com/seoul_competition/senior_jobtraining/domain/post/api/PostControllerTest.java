package com.seoul_competition.senior_jobtraining.domain.post.api;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.MOCK;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seoul_competition.senior_jobtraining.domain.post.dao.PostRepository;
import com.seoul_competition.senior_jobtraining.domain.post.dto.request.PostSaveReqDto;
import com.seoul_competition.senior_jobtraining.domain.post.dto.request.PostUpdateReqDto;
import com.seoul_competition.senior_jobtraining.domain.post.entity.Post;
import com.seoul_competition.senior_jobtraining.global.error.ErrorCode;
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
class PostControllerTest {

  @Autowired
  private MockMvc mvc;

  @Autowired
  private ObjectMapper om;

  @Autowired
  private PostRepository postRepository;

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
    Post post3 = postRepository.save(
        Post.builder().nickname("nickname3").password("1234").title("title3").content("content3")
            .hits(2L).build());
    Post post4 = postRepository.save(
        Post.builder().nickname("nickname4").password("1234").title("검색4").content("content4")
            .hits(2L).build());
  }


  @DisplayName("[POST] 게시글 등록 - 정상호출")
  @Test
  void givenPostInfo_whenRequesting_thenSavePost() throws Exception {
    // Given
    PostSaveReqDto postSaveReqDto = new PostSaveReqDto("nickname4", "1234", "title4", "content4",
        0L);
    String requestBody = om.writeValueAsString(postSaveReqDto);

    // When
    ResultActions resultActions = mvc.perform(
        post("/api/v1/posts").content(requestBody).contentType(
            MediaType.APPLICATION_JSON));

    // Then
    resultActions.andExpect(status().isCreated());
  }

  @DisplayName("[PUT] 게시글 수정 - 정상 호출")
  @Test
  void givenUpdatedPostInfo_whenRequesting_thenUpdateNewPost() throws Exception {
    // Given
    long postId = 1L;
    PostUpdateReqDto postUpdateReqDto = new PostUpdateReqDto("nickname수정", "1234", "title수정",
        "content수정");
    String requestBody = om.writeValueAsString(postUpdateReqDto);

    // When
    ResultActions resultActions = mvc.perform(
        put("/api/v1/posts/" + postId).content(requestBody)
            .contentType(MediaType.APPLICATION_JSON));

    // Then
    resultActions.andExpect(status().isCreated());
  }

  @DisplayName("[POST] 게시글 수정 - 비밀번호 불일치")
  @Test
  void givenUpdatedPostInfo_whenRequesting_thenThrowBusinessException() throws Exception {
    // Given
    long postId = 1L;
    PostUpdateReqDto postUpdateReqDto = new PostUpdateReqDto("nickname", "123123123", "title수정",
        "content수정");
    String requestBody = om.writeValueAsString(Map.of("password", postUpdateReqDto.password()));

    // When
    ResultActions resultActions = mvc.perform(
        post("/api/v1/posts/" + postId + "/matchCheck").content(requestBody)
            .contentType(MediaType.APPLICATION_JSON));

    // Then
    resultActions.andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.error").value(ErrorCode.PASSWORD_MISMATCH.getMessage()));
  }

  @DisplayName("[GET] 게시글 리스트 1페이지 - 정상 호출")
  @Test
  void givenNothing_whenRequestingPosts_thenReturnPosts() throws Exception {
    // Given
    long page = 0L;

    // When
    ResultActions resultActions = mvc.perform(get("/api/v1/posts?page=" + page));

    // Then
    resultActions.andExpect(jsonPath("$.data[1].nickname").value("nickname3"));
    resultActions.andExpect(jsonPath("$.data[1].title").value("title3"));
    resultActions.andExpect(jsonPath("$.data[1].content").value("content3"));
    resultActions.andExpect(jsonPath("$.data[1].hits").value(2L));
    resultActions.andExpect(jsonPath("$.data", hasSize(4)));
  }

  @DisplayName("[GET] 게시글 리스트 - 검색어와 함께 호출")
  @Test
  void givenSearchName_whenRequestingSearchingPost_thenReturnPosts() throws Exception {
    // Given
    long postId = 0L;
    String value = "검색";
    String expectedValue = "검색4";

    // When
    ResultActions resultActions = mvc.perform(
        get("/api/v1/posts?page=" + postId + "&name=" + value));

    // Then
    resultActions.andExpect(jsonPath("$.data[0].nickname").value("nickname4"));
    resultActions.andExpect(jsonPath("$.data[0].title").value(expectedValue));
    resultActions.andExpect(jsonPath("$.data[0].content").value("content4"));
    resultActions.andExpect(jsonPath("$.data[0].hits").value(2L));
    resultActions.andExpect(jsonPath("$.data", hasSize(1)));
  }

  @DisplayName("[GET] 게시글 상세 보기 - 정상 호출")
  @Test
  void givenPostId_whenRequestingPost_thenReturnPost() throws Exception {
    // Given
    long postId = 1L;

    // When
    ResultActions resultActions = mvc.perform(get("/api/v1/posts/" + postId));

    // Then
    resultActions.andExpect(jsonPath("$.nickname").value("nickname1"));
    resultActions.andExpect(jsonPath("$.title").value("title1"));
    resultActions.andExpect(jsonPath("$.content").value("content1"));
    resultActions.andExpect(jsonPath("$.hits").value(1L));
  }

  @DisplayName("[DELETE] 게시글 삭제 - 정상 호출")
  @Test
  void givenPostIdAndPassword_whenRequesting_thenDeletePost() throws Exception {
    // Given
    long postId = 1L;
    String password = "1234";
    Map<String, String> passwordMap = new HashMap<>();
    passwordMap.put("password", password);
    String requestBody = om.writeValueAsString(passwordMap);

    // When
    ResultActions resultActions = mvc.perform(
        delete("/api/v1/posts/" + postId).content(requestBody)
            .contentType(MediaType.APPLICATION_JSON));

    // Then
    resultActions.andExpect(status().isNoContent());
    assertThat(postRepository.findById(postId)).isEmpty();
  }

  @DisplayName("[DELETE] 게시글 삭제 - 비밀번호 불일치")
  @Test
  void givenPostIdAndWrongPassword_whenRequesting_thenThrowBusinessException() throws Exception {
    // Given
    long postId = 1L;
    String wrongPassword = "wrong_password";
    Map<String, String> passwordMap = new HashMap<>();
    passwordMap.put("password", wrongPassword);
    String requestBody = om.writeValueAsString(passwordMap);

    // When
    ResultActions resultActions = mvc.perform(
        delete("/api/v1/posts/" + postId).content(requestBody)
            .contentType(MediaType.APPLICATION_JSON));

    // Then
    resultActions.andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.error").value(ErrorCode.PASSWORD_MISMATCH.getMessage()));
    assertThat(postRepository.findById(postId)).isPresent();
  }
}