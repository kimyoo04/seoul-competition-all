package com.seoul_competition.senior_jobtraining.global.error;

import com.seoul_competition.senior_jobtraining.global.error.exception.BusinessException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {

  @ExceptionHandler(BindException.class)
  public ResponseEntity<Map<String, String>> bindException(BindException e) {
    Map<String, String> errors = getErrorMessage(e.getBindingResult());
    return ResponseEntity.badRequest().body(ErrorResponse.from(errors));
  }

  @ExceptionHandler(value = {BusinessException.class})
  protected ResponseEntity<Map<String, String>> handleConflict(BusinessException e) {
    Map<String, String> errors = new HashMap<>();
    errors.put("error", e.getErrorCode().getMessage());
    return ResponseEntity.status(e.getErrorCode().getHttpStatus())
        .body(errors);
  }


  private static Map<String, String> getErrorMessage(BindingResult bindingResult) {
    return bindingResult.getFieldErrors().stream()
        .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
  }
}
