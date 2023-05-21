package com.seoul_competition.senior_jobtraining.domain.review.entity;

import com.seoul_competition.senior_jobtraining.domain.education.entity.Education;
import com.seoul_competition.senior_jobtraining.global.error.ErrorCode;
import com.seoul_competition.senior_jobtraining.global.error.exception.BusinessException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "review")
public class Review {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "education_id", nullable = false)
  private Education education;

  @Column(nullable = false)
  private String nickname;
  @Column(nullable = false)
  private String password;
  @Column(nullable = false)
  private String content;
  @CreatedDate
  @Column
  private LocalDateTime createdAt;
  @LastModifiedDate
  @Column
  private LocalDateTime updatedAt;

  @Builder
  private Review(Education education, String nickname, String password, String content) {
    this.education = education;
    this.nickname = nickname;
    this.password = password;
    this.content = content;
  }

  public void checkPassword(String password) {
    if (!password.equals(this.password)) {
      throw new BusinessException(ErrorCode.PASSWORD_MISMATCH);
    }
  }

  public void update(String nickname, String content) {
    this.nickname = nickname;
    this.content = content;
  }
}
