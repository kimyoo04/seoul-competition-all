package com.seoul_competition.senior_jobtraining.domain.post.api;

import com.seoul_competition.senior_jobtraining.domain.post.application.PostRankService;
import com.seoul_competition.senior_jobtraining.domain.post.application.PostService;
import com.seoul_competition.senior_jobtraining.domain.post.dto.request.PostSaveReqDto;
import com.seoul_competition.senior_jobtraining.domain.post.dto.request.PostSearchReqDto;
import com.seoul_competition.senior_jobtraining.domain.post.dto.request.PostUpdateReqDto;
import com.seoul_competition.senior_jobtraining.domain.post.dto.response.PostDetailResDto;
import com.seoul_competition.senior_jobtraining.domain.post.dto.response.PostListResponse;
import com.seoul_competition.senior_jobtraining.domain.post.dto.response.PostRankListResDto;
import com.seoul_competition.senior_jobtraining.domain.user.application.UserDetailService;
import com.seoul_competition.senior_jobtraining.domain.user.application.UserSearchService;
import com.seoul_competition.senior_jobtraining.domain.user.dto.UserDetailSaveDto;
import com.seoul_competition.senior_jobtraining.domain.user.dto.UserSearchSaveDto;
import com.seoul_competition.senior_jobtraining.domain.user.entity.BoardCategory;
import com.seoul_competition.senior_jobtraining.global.util.cookie.CookieUtil;
import com.seoul_competition.senior_jobtraining.global.util.jwt.JwtUtil;
import io.jsonwebtoken.Claims;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "게시글", description = "게시글에 대한 API입니다.")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/posts")
public class PostController {

  @Value("${myapp.api-key}")
  private String SECRET_KEY;

  private final PostService postService;
  private final UserSearchService userSearchService;
  private final UserDetailService userDetailService;
  private final PostRankService postRankService;

  @Operation(summary = "게시글 저장", description = "게시글을 저장합니다.")
  @PostMapping
  public ResponseEntity<Void> savePost(@RequestBody @Valid PostSaveReqDto reqDto) {
    Long postId = postService.savePost(reqDto);
    return ResponseEntity.status(HttpStatus.CREATED)
        .location(URI.create("/posts/" + postId))
        .build();
  }

  @Operation(summary = "게시글 목록 조회", description = "페이징 처리된 게시글 목록을 조회합니다.")
  @GetMapping
  public ResponseEntity<PostListResponse> getPosts(
      @PageableDefault(size = 20, sort = "createdAt", direction = Direction.DESC)
      Pageable pageable, @CookieValue(value = "jwt", required = false) String jwt,
      HttpServletResponse response, @ModelAttribute PostSearchReqDto reqDto) {

    PostListResponse posts = postService.getPosts(pageable, reqDto,
        JwtUtil.verifyJwt(jwt, SECRET_KEY));
    if (posts.isUser() && reqDto.name() != null && reqDto.name().length() != 0) {
      Claims claims = JwtUtil.getClaims(jwt, SECRET_KEY);
      userSearchService.saveUserSearch(
          UserSearchSaveDto.from(claims, reqDto.name(), BoardCategory.FREE));
    } else if (!posts.isUser()) {
      Cookie cookie = CookieUtil.createExpiredCookie("jwt");
      response.addCookie(cookie);
    }
    return ResponseEntity.ok(posts);
  }

  @Operation(summary = "게시글 상세 조회", description = "특정 게시글의 상세 정보를 조회합니다.")
  @GetMapping("/{postId}")
  public ResponseEntity<PostDetailResDto> getPost(@PathVariable Long postId,
      @CookieValue(value = "jwt", required = false) String jwt, HttpServletResponse response) {
    PostDetailResDto postDetailResDto = postService.getPost(postId,
        JwtUtil.verifyJwt(jwt, SECRET_KEY));
    if (postDetailResDto.user()) {
      Claims claims = JwtUtil.getClaims(jwt, SECRET_KEY);
      userDetailService.saveUserDetail(UserDetailSaveDto.from(claims, postId, BoardCategory.FREE));
    } else {
      Cookie cookie = CookieUtil.createExpiredCookie("jwt");
      response.addCookie(cookie);
    }
    return ResponseEntity.status(HttpStatus.OK)
        .body(postDetailResDto);
  }

  @Operation(summary = "게시글 수정", description = "특정 게시글을 수정합니다.")
  @PutMapping("/{postId}")
  public ResponseEntity<Void> updatePost(@PathVariable Long postId,
      @RequestBody @Valid PostUpdateReqDto reqDto) {
    postService.update(postId, reqDto);
    return ResponseEntity.status(HttpStatus.CREATED)
        .location(URI.create("/posts/" + postId))
        .build();
  }

  @Operation(summary = "게시글 삭제", description = "특정 게시글을 삭제합니다.")
  @DeleteMapping("/{postId}")
  public ResponseEntity<Void> deletePost(@PathVariable Long postId,
      @RequestBody Map<String, String> password) {
    postService.delete(postId, password.get("password"));
    return ResponseEntity.noContent().build();
  }

  @Operation(summary = "비밀번호 일치 체크", description = "비밀번호가 일치하는지 확인합니다.")
  @PostMapping("/{postId}/matchCheck")
  public ResponseEntity<Void> matchCheck(@PathVariable Long postId,
      @RequestBody Map<String, String> password) {
    postService.matchCheck(postId, password.get("password"));
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/topFive/hits")
  private ResponseEntity<PostRankListResDto> getFivePostByHits(
      @CookieValue(value = "jwt", required = false) String jwt) {

    PostRankListResDto resDto = postRankService.getFiveByHits(JwtUtil.verifyJwt(jwt, SECRET_KEY));

    return ResponseEntity.ok(resDto);
  }
}
