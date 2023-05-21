package com.seoul_competition.senior_jobtraining.domain.education.api;

import static org.springframework.util.StringUtils.hasText;

import com.seoul_competition.senior_jobtraining.domain.education.application.EducationRankService;
import com.seoul_competition.senior_jobtraining.domain.education.application.EducationService;
import com.seoul_competition.senior_jobtraining.domain.education.dto.request.EducationRequest;
import com.seoul_competition.senior_jobtraining.domain.education.dto.request.EducationSearchReqDto;
import com.seoul_competition.senior_jobtraining.domain.education.dto.request.SearchKeywordRequest;
import com.seoul_competition.senior_jobtraining.domain.education.dto.response.EducationDetailResDto;
import com.seoul_competition.senior_jobtraining.domain.education.dto.response.EducationListPageResponse;
import com.seoul_competition.senior_jobtraining.domain.education.dto.response.EducationRankResDto;
import com.seoul_competition.senior_jobtraining.domain.education.dto.response.Recommend.RecommendationEducations;
import com.seoul_competition.senior_jobtraining.domain.education.dto.response.Recommend.RecommendationEducationsResponse;
import com.seoul_competition.senior_jobtraining.domain.user.application.UserDetailService;
import com.seoul_competition.senior_jobtraining.domain.user.application.UserSearchService;
import com.seoul_competition.senior_jobtraining.domain.user.dto.UserDetailSaveDto;
import com.seoul_competition.senior_jobtraining.domain.user.dto.UserSearchSaveDto;
import com.seoul_competition.senior_jobtraining.domain.user.entity.BoardCategory;
import com.seoul_competition.senior_jobtraining.global.util.cookie.CookieUtil;
import com.seoul_competition.senior_jobtraining.global.util.jwt.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api/v1/educations")
@Slf4j
@RequiredArgsConstructor
public class EducationController {

  @Value("${myapp.api-key}")
  private String SECRET_KEY;

  private final EducationService educationService;
  private final UserSearchService userSearchService;
  private final UserDetailService userDetailService;
  private final EducationRankService educationRankService;
  private final WebClient webClient;

  private static final String RECOMMEND_SEARCH_KEYWORD_URL = "http://fastapi:8000/recommend/searchKeyword";
  private static final String RECOMMEND_EDUCATION_ID_URL = "http://fastapi:8000/recommend/educationId";

  @GetMapping
  public ResponseEntity<EducationListPageResponse> getAllEducations(
      @PageableDefault(sort = "status", size = 20, direction = Direction.DESC) Pageable pageable,
      @ModelAttribute EducationSearchReqDto reqDto,
      @CookieValue(value = "jwt", required = false) String jwt,
      HttpServletResponse response) {

    educationService.update();

    EducationListPageResponse educations = educationService.getEducations(pageable, reqDto,
        JwtUtil.verifyJwt(jwt, SECRET_KEY));

    if (educations.user() && hasText(reqDto.name())) {
      Claims claims = JwtUtil.getClaims(jwt, SECRET_KEY);
      userSearchService.saveUserSearch(
          UserSearchSaveDto.from(claims, reqDto.name(), BoardCategory.EDUCATION));
    } else if (!educations.user()) {
      Cookie cookie = CookieUtil.createExpiredCookie("jwt");
      response.addCookie(cookie);
    }
    return ResponseEntity.status(HttpStatus.OK).body(educations);
  }

  @GetMapping("/{educationId}")
  public ResponseEntity<EducationDetailResDto> getEducation(@PathVariable long educationId,
      @CookieValue(value = "jwt", required = false) String jwt, HttpServletResponse response) {
    EducationDetailResDto education = educationService.findById(educationId,
        JwtUtil.verifyJwt(jwt, SECRET_KEY));
    if (education.user()) {
      Claims claims = JwtUtil.getClaims(jwt, SECRET_KEY);
      userDetailService.saveUserDetail(
          UserDetailSaveDto.from(claims, educationId, BoardCategory.EDUCATION));
    } else {
      Cookie cookie = CookieUtil.createExpiredCookie("jwt");
      response.addCookie(cookie);
    }
    return ResponseEntity.status(HttpStatus.OK).body(education);
  }

  @GetMapping("/similar")
  public ResponseEntity<RecommendationEducationsResponse> recommend(
      @RequestParam(required = false) String keyword,
      @RequestParam(required = false) Long educationId) {
    RecommendationEducationsResponse response = RecommendationEducationsResponse.of(List.of());
    if (StringUtils.hasText(keyword)) {
      RecommendationEducations recommendationEducations = callRecommendationApi(
          RECOMMEND_SEARCH_KEYWORD_URL, SearchKeywordRequest.of(keyword));
      response = educationService.findRecommendedTraining(recommendationEducations.results());
      return ResponseEntity.ok(response);
    } else if (educationId != null) {
      RecommendationEducations recommendationEducations = callRecommendationApi(
          RECOMMEND_EDUCATION_ID_URL, EducationRequest.of(educationId));
      response = educationService.findRecommendedTraining(recommendationEducations.results());
      return ResponseEntity.ok(response);
    } else {
      return ResponseEntity.ok(response);
    }
  }


  private <T> RecommendationEducations callRecommendationApi(String apiUrl, T requestDto) {
    Mono<RecommendationEducations> response = webClient
        .method(HttpMethod.POST)
        .uri(apiUrl)
        .bodyValue(requestDto)
        .accept(MediaType.APPLICATION_JSON)
        .retrieve()
        .bodyToMono(RecommendationEducations.class);
    return response.block();
  }

  @GetMapping("/topFive/hits")
  public ResponseEntity<EducationRankResDto> getFiveEducationsByHits(
      @CookieValue(value = "jwt", required = false) String jwt,
      @RequestParam(value = "interest", required = false) String interest) {

    EducationRankResDto resDto;

    if (!StringUtils.hasText(interest)) {
      resDto = educationRankService.getFiveByHits(JwtUtil.verifyJwt(jwt, SECRET_KEY));
    } else {
      resDto = educationRankService.getFiveInterestByHits(interest,
          JwtUtil.verifyJwt(jwt, SECRET_KEY));
    }

    return ResponseEntity.ok(resDto);
  }
}
