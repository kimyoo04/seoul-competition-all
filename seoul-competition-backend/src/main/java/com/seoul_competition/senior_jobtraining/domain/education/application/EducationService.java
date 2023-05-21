package com.seoul_competition.senior_jobtraining.domain.education.application;

import static com.seoul_competition.senior_jobtraining.domain.education.entity.QEducation.education;

import com.querydsl.core.BooleanBuilder;
import com.seoul_competition.senior_jobtraining.domain.education.application.convenience.EducationFiftyService;
import com.seoul_competition.senior_jobtraining.domain.education.application.convenience.EducationSeniorService;
import com.seoul_competition.senior_jobtraining.domain.education.dao.EducationRepository;
import com.seoul_competition.senior_jobtraining.domain.education.dto.request.EducationSearchReqDto;
import com.seoul_competition.senior_jobtraining.domain.education.dto.response.EducationDetailResDto;
import com.seoul_competition.senior_jobtraining.domain.education.dto.response.EducationListPageResponse;
import com.seoul_competition.senior_jobtraining.domain.education.dto.response.EducationResponse;
import com.seoul_competition.senior_jobtraining.domain.education.dto.response.Recommend.RecommendationEducation;
import com.seoul_competition.senior_jobtraining.domain.education.dto.response.Recommend.RecommendationEducationsDto;
import com.seoul_competition.senior_jobtraining.domain.education.dto.response.Recommend.RecommendationEducationsResponse;
import com.seoul_competition.senior_jobtraining.domain.education.entity.Education;
import com.seoul_competition.senior_jobtraining.global.error.ErrorCode;
import com.seoul_competition.senior_jobtraining.global.error.exception.BusinessException;
import com.seoul_competition.senior_jobtraining.global.external.openApi.education.SeniorApi;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Getter
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class EducationService {

  private final EducationRepository educationRepository;
  private final SeniorApi seniorApi;
  private final EducationSeniorService educationSeniorService;
  private final EducationFiftyService educationFiftyService;

  public EducationListPageResponse getEducations(Pageable pageable, EducationSearchReqDto reqDto,
      boolean user) {

    BooleanBuilder builder = new BooleanBuilder();

    if (reqDto.name() != null) {
      builder.and(education.name.contains(reqDto.name()));
    }
    if (reqDto.status() != null) {
      builder.and(education.status.eq(reqDto.status()));
    }
    if (reqDto.minPrice() != null) {
      builder.and(education.price.goe(reqDto.minPrice()));
    }
    if (reqDto.maxPrice() != null) {
      builder.and(education.price.loe(reqDto.maxPrice()));
    }
    if (reqDto.startDate() != null) {
      builder.and(education.educationStart.goe(reqDto.startDate()));
    }
    if (reqDto.endDate() != null) {
      builder.and(education.educationEnd.loe(reqDto.endDate()));
    }

    Page<Education> educationPage = educationRepository.findAll(builder, pageable);

    checkPageNumber(pageable, educationPage);

    return new EducationListPageResponse(entityToResponse(educationPage),
        educationPage.getTotalPages() - 1, pageable.getPageNumber(),
        educationPage.getTotalElements(), user);
  }

  private void checkPageNumber(Pageable pageable, Page<Education> educationPage) {
    if (pageable.getPageNumber() >= educationPage.getTotalPages()) {
      throw new BusinessException(ErrorCode.PAGE_NOT_FOUND);
    }
  }

  private List<EducationResponse> entityToResponse(Page<Education> educationPage) {
    return educationPage.getContent().stream().map(EducationResponse::new)
        .collect(Collectors.toList());
  }

  @Transactional
  public EducationDetailResDto findById(Long id, Boolean user) {
    Education findEducation = educationRepository.findById(id).get();
    findEducation.hitsPlus();
    return new EducationDetailResDto(findEducation, user);
  }

  /***
   * 최근에 저장된 총 데이터 갯수인 totalCount를 저장하고 그것보다 크면 update 실행
   * senior - 마지막 페이지에 추가로 데이터가 들어오기 때문에, 현재 최대 크기 + 1을 해주어, 업데이트 데이터로 접근
   * fifty - 랜덤으로 추가하기 때문에 (앞쪽으로 들어오긴 함) 총 데이터 크기 차이로 차수를 구하여, 그 차수만큼 업데이트 함
   *           - 데이터 유무 분별은 OriginId로 하였음
   *           - 성능이슈가 조금 일어날 수 있으므로, 차수가 없어지면 바로 종료시켰음
   */

  @Scheduled(cron = "0 0 10 * * *")
  @Transactional
  public void update() {
    int updateSeniorTotalCount = educationSeniorService.getSeniorApi().getUpdateTotalCount();
    int seniorSize = educationRepository.countByOriginIdLessThanEqual(1000L);
    if (seniorSize < updateSeniorTotalCount) {
      educationSeniorService.saveSenior(seniorSize + 1);
    }

    int updateFiftyTotalCount = educationFiftyService.getFiftyApi().getUpdateTotalCount();
    int fiftySize = educationRepository.countByOriginIdGreaterThanEqual(1000L);
    if (fiftySize < updateFiftyTotalCount) {
      educationFiftyService.updateFifty(updateFiftyTotalCount - fiftySize);
    }
  }

  public RecommendationEducationsResponse findRecommendedTraining(
      List<RecommendationEducation> results) {
    List<Long> ids = results.stream()
        .map(RecommendationEducation::from)
        .collect(Collectors.toList());
    List<RecommendationEducationsDto> recommendationEducationsDto = educationRepository.recommendQuery(
        ids);
    return RecommendationEducationsResponse.of(recommendationEducationsDto);
  }
}
