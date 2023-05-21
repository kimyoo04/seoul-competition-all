package com.seoul_competition.senior_jobtraining.domain.user.application;

import com.seoul_competition.senior_jobtraining.domain.user.dao.UserSearchRepository;
import com.seoul_competition.senior_jobtraining.domain.user.dto.UserSearchSaveDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserSearchService {

  private final UserSearchRepository userSearchRepository;

  @Transactional
  public void saveUserSearch(UserSearchSaveDto saveDto) {
    userSearchRepository.save(saveDto.toEntity());
  }

}
