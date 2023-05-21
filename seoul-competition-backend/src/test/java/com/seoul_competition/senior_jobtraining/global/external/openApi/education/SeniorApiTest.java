package com.seoul_competition.senior_jobtraining.global.external.openApi.education;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SeniorApiTest {

  @Autowired
  private SeniorApi seniorApi;

  @DisplayName("키 값이 정상인지 확인한다.")
  @Test
  void check_key() {
    System.out.println("seniorApi = " + seniorApi.getKey());
  }

  @DisplayName("공공 데이터에서 json을 정상적으로 파싱하는지 확인한다.")
  @Test
  void parsing_check() {
    seniorApi.getJson(0);
    System.out.println("seniorApi.getTotalCount() = " + seniorApi.getTotalCount());
    System.out.println("seniorApi.getSubResult() = " + seniorApi.getSubResult());
    System.out.println("seniorApi.getInfoArr() = " + seniorApi.getInfoArr());
  }

}