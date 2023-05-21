package com.seoul_competition.senior_jobtraining.global.scheduler;

import com.seoul_competition.senior_jobtraining.domain.chat.dao.ChatHistoryRepository;
import com.seoul_competition.senior_jobtraining.domain.chat.entity.ChatHistory;
import com.seoul_competition.senior_jobtraining.domain.education.dao.EducationRepository;
import com.seoul_competition.senior_jobtraining.domain.education.entity.Education;
import com.seoul_competition.senior_jobtraining.global.scheduler.dto.ChatHistoryMonthReqDto;
import com.seoul_competition.senior_jobtraining.global.scheduler.dto.EducationMonthReqDto;
import com.seoul_competition.senior_jobtraining.global.scheduler.dto.ModelUpdateData;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class EducationAndChatInfoScheduler {

  private final EducationRepository educationRepository;
  private final ChatHistoryRepository chatHistoryRepository;
  private final WebClient webClient;
  private final String EDUCATION_AND_CHAT_INFO_URL = "http://fastapi:8000/model";

  @Scheduled(cron = "0 0 4 L * ?")
  public void sendEduAndChatInfo() {
    LocalDate currentDate = LocalDate.now();
    LocalDate lastDayOfMonth = currentDate.with(TemporalAdjusters.lastDayOfMonth());
    LocalDate firstDayOfMonth = lastDayOfMonth.withDayOfMonth(1);

    LocalDateTime startDateTime = firstDayOfMonth.atStartOfDay();
    LocalDateTime endDateTime = lastDayOfMonth.atTime(LocalTime.MAX);

    List<EducationMonthReqDto> educations = new ArrayList<>();
    for (Education education : educationRepository.findByCreatedAtBetween(
        startDateTime, endDateTime)) {
      EducationMonthReqDto educationMonthReqDto = EducationMonthReqDto.from(education);
      educations.add(educationMonthReqDto);
    }

    List<ChatHistoryMonthReqDto> chatHistories = new ArrayList<>();
    for (ChatHistory chatHistory : chatHistoryRepository.findByCreatedAtBetween(
        startDateTime, endDateTime)) {
      ChatHistoryMonthReqDto chatHistoryMonthReqDto = ChatHistoryMonthReqDto.from(chatHistory);
      chatHistories.add(chatHistoryMonthReqDto);
    }

    ModelUpdateData data = ModelUpdateData.of(educations, chatHistories);

    webClient.post()
        .uri(EDUCATION_AND_CHAT_INFO_URL)
        .bodyValue(data)
        .retrieve()
        .toBodilessEntity()
        .block();
  }
}
