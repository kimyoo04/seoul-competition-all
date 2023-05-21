package com.seoul_competition.senior_jobtraining.domain.chat.api;

import com.seoul_competition.senior_jobtraining.domain.chat.application.ChatHistoryService;
import com.seoul_competition.senior_jobtraining.domain.chat.dto.ChatSaveDto;
import com.seoul_competition.senior_jobtraining.domain.chat.dto.request.ChatFeedbackReqDto;
import com.seoul_competition.senior_jobtraining.domain.chat.dto.request.ChatQuestionReqDto;
import com.seoul_competition.senior_jobtraining.domain.chat.dto.response.ChatAnswerResDto;
import com.seoul_competition.senior_jobtraining.domain.chat.dto.response.ChatQuestionResDto;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatHistoryController {

  private final ChatHistoryService chatHistoryService;
  private final WebClient webClient;
  private static final String API_URL = "http://fastapi:8000/chat/answer";

  @Operation(summary = "채팅 응답 기록", description = "채팅 응답을 받습니다.")
  @PostMapping("/question")
  public Mono<ResponseEntity<ChatQuestionResDto>> chatAnswer(
      @RequestBody @Valid ChatQuestionReqDto reqDto) {

    return webClient.post()
        .uri(API_URL)
        .body(BodyInserters.fromValue(reqDto))
        .retrieve()
        .bodyToMono(ChatAnswerResDto.class)
        .flatMap(response -> {
          if (response != null) {
            Long chatId = chatHistoryService.createAChat(ChatSaveDto.of(reqDto, response.answer()));
            ChatQuestionResDto chatQuestionResDto = ChatQuestionResDto.of(chatId,
                response.answer());
            return Mono.just(ResponseEntity.status(HttpStatus.CREATED).body(chatQuestionResDto));
          } else {
            return Mono.just(ResponseEntity.noContent().build());
          }
        });
  }


  @Operation(summary = "채팅응답 피드백", description = "채팅 응답 피드백을 갱신합니다.")
  @PutMapping("/feedback")
  public ResponseEntity<Void> generateFeedback(@RequestBody @Valid ChatFeedbackReqDto reqDto) {
    chatHistoryService.updateAChat(reqDto);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }
}
