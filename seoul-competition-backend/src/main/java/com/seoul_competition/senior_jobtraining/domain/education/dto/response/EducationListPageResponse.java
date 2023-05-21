package com.seoul_competition.senior_jobtraining.domain.education.dto.response;

import java.util.List;

public record EducationListPageResponse(List<EducationResponse> data, int totalPages,
                                        int currentPage, Long totalCounts,boolean user) {

}
