package com.seoul_competition.senior_jobtraining.domain.education.application;

import static org.junit.jupiter.api.Assertions.*;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest
class EducationServiceTest {

  @Autowired
  EducationService educationService;

  @DisplayName("API에서 가져온 데이터 총량이 같아야한다.")
  @Test
  void should_sameTotalCount_when_fiftyApiGet() {
    educationService.saveAll();
    Assertions.assertThat(educationService.getEducationRepository().count())
        .isEqualTo(educationService.getEducationFiftyService().getFiftyApi().getTotalCount() +
            educationService.getSeniorApi().getTotalCount());

  }
}