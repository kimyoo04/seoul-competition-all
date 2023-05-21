package com.seoul_competition.senior_jobtraining.domain.education.application.convenience;

import com.seoul_competition.senior_jobtraining.domain.education.dao.EducationRepository;
import com.seoul_competition.senior_jobtraining.domain.education.entity.Education;
import com.seoul_competition.senior_jobtraining.global.external.openApi.education.SeniorApi;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Getter
@Transactional(readOnly = true)
public class EducationSeniorService {

  private final EducationRepository educationRepository;

  private final SeniorApi seniorApi;

  private final static String BEFORE_WAITING_CONTENT = "접수중";
  private final static String AFTER_WAITING_CONTENT = "수강신청중";


  @Transactional
  public void saveSenior(int pageNumber) {
    seniorApi.getJson(pageNumber);
    JSONArray infoArr = seniorApi.getInfoArr();
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");

    for (int i = 0; i < infoArr.size(); i++) {
      JSONObject jsonObject = (JSONObject) infoArr.get(i);

      String applyState = getCommonApplyState(jsonObject);

      Education education = Education.builder()
          .name((String) jsonObject.get("SUBJECT"))
          .status(applyState)
          .url((String) jsonObject.get("VIEWDETAIL"))
          .price((Integer.parseInt((String) jsonObject.get("REGISTCOST"))))
          .capacity(Integer.parseInt((String) jsonObject.get("REGISTPEOPLE")))
          .registerStart(
              LocalDate.parse(
                  ((String) jsonObject.get("APPLICATIONSTARTDATE")).replaceAll("-", "."),
                  formatter))
          .registerEnd(
              LocalDate.parse(
                  ((String) jsonObject.get("APPLICATIONENDDATE")).replaceAll("-", "."), formatter))
          .educationStart(
              LocalDate.parse(((String) jsonObject.get("STARTDATE")).replaceAll("-", "."),
                  formatter))
          .educationEnd(
              LocalDate.parse(((String) jsonObject.get("ENDDATE")).replaceAll("-", "."),
                  formatter))
          .hits(0L)
          .originId(Integer.parseInt((String) jsonObject.get("IDX")))
          .build();
      educationRepository.save(education);
    }
  }

  private static String getCommonApplyState(JSONObject jsonObject) {
    String applyState = (String) jsonObject.get("APPLY_STATE");
    if (applyState.equals(BEFORE_WAITING_CONTENT)) {
      applyState = AFTER_WAITING_CONTENT;
    }
    return applyState;
  }

}
