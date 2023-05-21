package com.seoul_competition.senior_jobtraining.global.external.openApi.education;

import com.seoul_competition.senior_jobtraining.global.error.BusinessException;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import lombok.Getter;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class FiftyApi {

  private static final String OPENAPI_URL = "http://openapi.seoul.go.kr:8088/%s/json/FiftyPotalEduInfo/%d/%d";

  @Value("${key.fifty}")
  private String key;

  private Long totalCount;
  private JSONObject subResult;
  private JSONArray infoArr;

  public void getJson(int startPage, int endPage) {
    try {
      URL url = new URL(String.format(OPENAPI_URL, key, startPage, endPage));
      BufferedReader bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
      jsonPasring(bf.readLine());
    } catch (Exception e) {
      throw new BusinessException();
    }
  }

  private void jsonPasring(String result) {
    JSONParser jsonParser = new JSONParser();
    try {
      JSONObject jsonObject = (JSONObject) jsonParser.parse(result);
      JSONObject fiftyPotal = (JSONObject) jsonObject.get("FiftyPotalEduInfo");

      totalCount = (Long) fiftyPotal.get("list_total_count");
      subResult = (JSONObject) fiftyPotal.get("RESULT");
      infoArr = (JSONArray) fiftyPotal.get("row");
    } catch (Exception e) {
      throw new BusinessException();
    }
  }

  public int getUpdateTotalCount() {
    try {
      URL url = new URL(String.format(OPENAPI_URL, key, 1, 1)); // totalCount만 얻으면 되기 때문에, 최소한으로 추출
      BufferedReader bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
      JSONParser jsonParser = new JSONParser();
      JSONObject jsonObject = (JSONObject) jsonParser.parse(bf.readLine());
      JSONObject fiftyPotal = (JSONObject) jsonObject.get("FiftyPotalEduInfo");
      return ((Long) fiftyPotal.get("list_total_count")).intValue();
    } catch (Exception e) {
      e.printStackTrace();
    }
    return Long.valueOf(totalCount).intValue();
  }
}
