package com.seoul_competition.senior_jobtraining.domain.education.application;

import com.seoul_competition.senior_jobtraining.domain.education.dao.EducationRepository;
import com.seoul_competition.senior_jobtraining.domain.education.dto.response.EducationRankResDto;
import com.seoul_competition.senior_jobtraining.domain.education.dto.response.EducationResponse;
import com.seoul_competition.senior_jobtraining.domain.education.entity.Education;
import com.seoul_competition.senior_jobtraining.domain.user.dao.UserDetailRepository;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EducationRankService {

  private final EducationRepository educationRepository;
  private final UserDetailRepository userDetailRepository;

  public EducationRankResDto getFiveByHits(boolean user) {

    List<Education> educationList = educationRepository.findAll(
            PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "hits")))
        .getContent();

    List<EducationResponse> educationResponseList = educationList.stream()
        .map(EducationResponse::new)
        .collect(Collectors.toList());

    return new EducationRankResDto(educationResponseList, user);
  }

  public EducationRankResDto getFiveInterestByHits(String interest, boolean user) {

    List<Object[]> resultList = userDetailRepository.getTop5PostCountsByInterestAndCategory(
        interest);

    List<Long> educationIds = resultList.stream()
        .map(result -> (Long) result[0])
        .collect(Collectors.toList());

    String educationIdsAsString = StringUtils.collectionToCommaDelimitedString(educationIds);

    List<Education> educations = educationRepository.findByIdInOrderByCustomSort(educationIds,educationIdsAsString);

    List<EducationResponse> educationResponseList = educations.stream()
        .map(EducationResponse::new)
        .collect(Collectors.toList());

    return new EducationRankResDto(educationResponseList, user);
  }
}
