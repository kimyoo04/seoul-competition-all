package com.seoul_competition.senior_jobtraining.domain.education.dto.request;

public record SearchKeywordRequest(
    String searchKeyword
) {

  public static SearchKeywordRequest of(String searchKeyword) {
    return new SearchKeywordRequest(searchKeyword);
  }
}
