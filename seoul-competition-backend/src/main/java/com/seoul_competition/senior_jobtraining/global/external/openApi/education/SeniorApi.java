package com.seoul_competition.senior_jobtraining.global.external.openApi.education;

import jakarta.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import lombok.Getter;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class SeniorApi {

  private static final String OPENAPI_URL =
      "http://openapi.seoul.go.kr:8088/%s/json/tbViewProgram/%s/%s";

  @Value("${key.senior}")
  private String key;

  private Long totalCount;
  private JSONObject subResult;
  private JSONArray infoArr;

  public void getJson(int pageNumber) {
    try {
      URL url = new URL(String.format(OPENAPI_URL, key, pageNumber, 999));
      BufferedReader bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
      jsonPasring(bf.readLine());
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  private void jsonPasring(String result) throws ParseException {
    JSONParser jsonParser = new JSONParser();
    JSONObject jsonObject = (JSONObject) jsonParser.parse(result);
    JSONObject tbView = (JSONObject) jsonObject.get("tbViewProgram");

    totalCount = (Long) tbView.get("list_total_count");
    subResult = (JSONObject) tbView.get("RESULT");
    infoArr = (JSONArray) tbView.get("row");
  }

  public int getUpdateTotalCount() {
    try {
      URL url = new URL(String.format(OPENAPI_URL, key, 1, 1));  // totalCount만 얻으면 되기 때문에, 최소한으로 추출
      BufferedReader bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
      JSONParser jsonParser = new JSONParser();
      JSONObject jsonObject = (JSONObject) jsonParser.parse(bf.readLine());
      JSONObject tbView = (JSONObject) jsonObject.get("tbViewProgram");
      return ((Long) tbView.get("list_total_count")).intValue();
    } catch (Exception e) {
      e.printStackTrace();
    }
    return Long.valueOf(totalCount).intValue();
  }
}
