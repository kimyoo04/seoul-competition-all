package com.seoul_competition.senior_jobtraining.global.error;

import static lombok.AccessLevel.PRIVATE;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = PRIVATE)
public class ErrorResponse {

  public static Map<String, String> from(Map<String, String> errors) {
    return errors;
  }
  

  private final Map<String, String> errors;
}
