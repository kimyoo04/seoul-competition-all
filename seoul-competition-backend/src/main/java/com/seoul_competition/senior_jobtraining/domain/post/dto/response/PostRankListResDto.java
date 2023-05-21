package com.seoul_competition.senior_jobtraining.domain.post.dto.response;

import java.util.List;

public record PostRankListResDto(
    List<PostRankResDto> data,
    boolean user
) {

}
