package com.seoul_competition.senior_jobtraining.domain.comment.api;

import com.seoul_competition.senior_jobtraining.domain.comment.application.CommentService;
import com.seoul_competition.senior_jobtraining.domain.comment.dto.request.CommentSaveReqDto;
import com.seoul_competition.senior_jobtraining.domain.comment.dto.request.CommentUpdateReqDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "댓글", description = "댓글에 대한 API입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/comment")
public class CommentController {

  private final CommentService commentService;

  @Operation(summary = "댓글 작성", description = "댓글을 작성합니다.")
  @PostMapping
  public ResponseEntity<Void> createComment(
      @RequestBody @Valid CommentSaveReqDto reqDto
  ) {
    commentService.create(reqDto);
    return ResponseEntity.status(HttpStatus.CREATED)
        .build();
  }

  @Operation(summary = "댓글 수정", description = "댓글을 수정합니다.")
  @PutMapping("/{commentId}")
  public ResponseEntity<Void> updateComment(
      @RequestBody @Valid CommentUpdateReqDto reqDto,
      @PathVariable Long commentId
  ) {
    commentService.update(commentId, reqDto);
    return ResponseEntity.status(HttpStatus.CREATED)
        .build();
  }

  @Operation(summary = "댓글 삭제", description = "댓글을 삭제합니다.")
  @DeleteMapping("/{commentId}")
  public ResponseEntity<Void> deleteComment(@PathVariable Long commentId,
      @RequestBody Map<String, String> password) {
    commentService.delete(commentId, password.get("password"));
    return ResponseEntity.noContent().build();
  }

  @Operation(summary = "비밀번호 일치", description = "비밀번호가 일치하는지 확인")
  @PostMapping("/{commentId}/matchCheck")
  public ResponseEntity<Void> matchCheck(@PathVariable Long commentId,
      @RequestBody Map<String, String> password) {
    commentService.matchCheck(commentId, password.get("password"));
    return ResponseEntity.noContent().build();
  }
}
