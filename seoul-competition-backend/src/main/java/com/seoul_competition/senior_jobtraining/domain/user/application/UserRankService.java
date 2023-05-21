package com.seoul_competition.senior_jobtraining.domain.user.application;

import com.seoul_competition.senior_jobtraining.domain.user.dao.UserSearchRepository;
import com.seoul_competition.senior_jobtraining.domain.user.dto.response.UserSearchKeywordListResDto;
import com.seoul_competition.senior_jobtraining.domain.user.dto.response.UserSearchKeywordResDto;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserRankService {

  private final UserSearchRepository userSearchRepository;

  public UserSearchKeywordListResDto getUserSearchKeyword(boolean user) {
    List<Object[]> userSearchCountByKeyword = userSearchRepository.getUserSearchCountByKeyword();

    List<UserSearchKeywordResDto> collect = userSearchCountByKeyword.stream()
        .map(objects -> new UserSearchKeywordResDto(objects[0].toString(),
            Integer.parseInt(objects[1].toString())))
        .collect(Collectors.toList());

    return new UserSearchKeywordListResDto(collect, user);
  }

  public UserSearchKeywordListResDto getUserSearchKeywordByAges(String ages, boolean user) {
    List<Object[]> userSearchCountByKeyword = userSearchRepository.getUserSearchCountByKeywordAndAges(
        ages);

    List<UserSearchKeywordResDto> collect = userSearchCountByKeyword.stream()
        .map(objects -> new UserSearchKeywordResDto(objects[0].toString(),
            Integer.parseInt(objects[1].toString())))
        .collect(Collectors.toList());

    return new UserSearchKeywordListResDto(collect, user);
  }
}
