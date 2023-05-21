package com.seoul_competition.senior_jobtraining.domain.chat.entity;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = PROTECTED)
@Entity
@Table(name = "chat_history")
public class ChatHistory {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;

  private String question;

  private String answer;

  private Boolean feedback = null;

  @CreatedDate
  @Column(nullable = false)
  private LocalDateTime createdAt;

  @Builder
  public ChatHistory(String question, String answer) {
    this.question = question;
    this.answer = answer;
  }

  public void update(boolean feedback) {
    this.feedback = feedback;
  }
}
