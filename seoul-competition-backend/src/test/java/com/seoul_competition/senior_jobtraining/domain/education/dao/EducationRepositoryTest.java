package com.seoul_competition.senior_jobtraining.domain.education.dao;

import static org.assertj.core.api.Assertions.assertThat;

import com.seoul_competition.senior_jobtraining.domain.education.entity.Education;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest
class EducationRepositoryTest {

  @Autowired
  EducationRepository educationRepository;

  @BeforeEach
  public void beforeEach() {
    Education Education1 = Education.builder()
        .name("aaa")
        .state("as")
        .url("Asda")
        .price("120")
        .registerStart("2024-12-25")
        .registerEnd("2024-12-25")
        .educationStart("2024-12-25")
        .educationEnd("2024-12-25")
        .build();

    Education Education2 = Education.builder()
        .name("bbb")
        .state("saz")
        .url("http:Asda")
        .price("1201111")
        .registerStart("2024-12-25")
        .registerEnd("2024-12-25")
        .educationStart("2024-12-25")
        .educationEnd("2024-12-25")
        .build();

    educationRepository.save(Education1);
    educationRepository.save(Education2);
  }

  @DisplayName("Education 모두 DB에 정상 저장되는지 확인")
  @Test
  public void when_findAll_should_right() {
    List<Education> findEducations = educationRepository.findAll();
    assertThat(findEducations.size()).isEqualTo(2);
  }

}