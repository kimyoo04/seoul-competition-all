package com.seoul_competition.senior_jobtraining.domain.user.application;

import com.seoul_competition.senior_jobtraining.domain.user.dao.UserDetailRepository;
import com.seoul_competition.senior_jobtraining.domain.user.dto.UserDetailSaveDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserDetailService {

  private final UserDetailRepository userDetailRepository;

  @Transactional
  public void saveUserDetail(UserDetailSaveDto saveDto) {
    userDetailRepository.save(saveDto.toEntity());
  }
}
