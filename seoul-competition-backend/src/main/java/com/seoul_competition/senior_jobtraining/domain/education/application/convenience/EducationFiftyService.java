package com.seoul_competition.senior_jobtraining.domain.education.application.convenience;

import com.seoul_competition.senior_jobtraining.domain.education.dao.EducationRepository;
import com.seoul_competition.senior_jobtraining.domain.education.entity.Education;
import com.seoul_competition.senior_jobtraining.global.error.BusinessException;
import com.seoul_competition.senior_jobtraining.global.external.openApi.education.FiftyApi;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Getter
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EducationFiftyService {

  private final EducationRepository educationRepository;
  private final FiftyApi fiftyApi;
  private static final int increaseUnit = 1000;
  private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");

  @Transactional
  public void saveFifty() {
    int startPage = 0;
    int endPage = 999;
    try {
      while (true) {
        fiftyApi.getJson(startPage, endPage);
        saveInfoArr(fiftyApi.getInfoArr());
        startPage += increaseUnit;
        endPage += increaseUnit;
      }
    } catch (BusinessException e) { // 끝났다는 뜻
    }
  }

  @Transactional
  public void updateFifty(int diffCount) {
    int startPage = 0;
    int endPage = 999;
    int tempCount = diffCount;

    try {
      while (tempCount > 0) {
        fiftyApi.getJson(startPage, endPage);
        JSONArray infoArr = fiftyApi.getInfoArr();

        for (int i = 0; i < infoArr.size(); i++) {
          if (tempCount == 0) {
            throw new BusinessException();
          }
          JSONObject jsonObject = (JSONObject) infoArr.get(i);
          if (!educationRepository.findByOriginId(Long.getLong((String) jsonObject.get("LCT_NO")))
              .isEmpty()) {
            continue;
          } else {
            Education education = Education.builder()
                .name((String) jsonObject.get("LCT_NM"))
                .status((String) jsonObject.get("LCT_STAT"))
                .url((String) jsonObject.get("CR_URL"))
                .price(Integer.parseInt((String) jsonObject.get("LCT_COST")))
                .capacity(Integer.parseInt(
                    (String) jsonObject.get("CR_PPL_STAT") != "" ? (String) jsonObject.get(
                        "CR_PPL_STAT") : "0"))
                .registerStart(LocalDate.parse((String) jsonObject.get("REG_STDE"), formatter))
                .registerEnd(LocalDate.parse((String) jsonObject.get("REG_EDDE"), formatter))
                .educationStart(LocalDate.parse((String) jsonObject.get("CR_STDE"), formatter))
                .educationEnd(LocalDate.parse((String) jsonObject.get("CR_EDDE"), formatter))
                .hits(0L)
                .originId(Integer.parseInt((String) jsonObject.get("LCT_NO")))
                .build();
            educationRepository.save(education);
            tempCount--;
          }
        }
        startPage += increaseUnit;
        endPage += increaseUnit;
      }
    } catch (BusinessException e) {

    }
  }

  private void saveInfoArr(JSONArray infoArr) {
    for (int i = 0; i < infoArr.size(); i++) {
      JSONObject jsonObject = (JSONObject) infoArr.get(i);
      Education education = Education.builder()
          .name((String) jsonObject.get("LCT_NM"))
          .status((String) jsonObject.get("LCT_STAT"))
          .url((String) jsonObject.get("CR_URL"))
          .price(Integer.parseInt((String) jsonObject.get("LCT_COST")))
          .capacity(Integer.parseInt(
              (String) jsonObject.get("CR_PPL_STAT") != "" ? (String) jsonObject.get(
                  "CR_PPL_STAT") : "0"))
          .registerStart(LocalDate.parse((String) jsonObject.get("REG_STDE"), formatter))
          .registerEnd(LocalDate.parse((String) jsonObject.get("REG_EDDE"), formatter))
          .educationStart(LocalDate.parse((String) jsonObject.get("CR_STDE"), formatter))
          .educationEnd(LocalDate.parse((String) jsonObject.get("CR_EDDE"), formatter))
          .hits(0L)
          .originId(Integer.parseInt((String) jsonObject.get("LCT_NO")))
          .build();
      educationRepository.save(education);
    }
  }
}


