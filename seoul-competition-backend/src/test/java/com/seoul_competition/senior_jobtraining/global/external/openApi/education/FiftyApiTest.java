package com.seoul_competition.senior_jobtraining.global.external.openApi.education;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class FiftyApiTest {

  @Autowired
  private FiftyApi fiftyApi;

  @DisplayName("키 값이 정상인지 확인한다.")
  @Test
  void check_key() {
    System.out.println("fiftyApi = " + fiftyApi.getKey());
  }

  @DisplayName("공공 데이터에서 json을 정상적으로 파싱하는지 확인한다.")
  @Test
  void parsing_check() {
    fiftyApi.getJson(0, 999);
    System.out.println("fiftyApi.getTotalCount() = " + fiftyApi.getTotalCount());
    System.out.println("fiftyApi.getSubResult() = " + fiftyApi.getSubResult());
    System.out.println("fiftyApi.getInfoArr() = " + fiftyApi.getInfoArr());
  }
}