package com.seoul_competition.senior_jobtraining.domain.user.entity;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.Objects;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = PROTECTED)
@Entity
@Table(name = "userSearch")
public class UserSearch {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;

  @Column(nullable = false)
  private BoardCategory category;

  @Column(nullable = false)
  private String gender;

  @Column(nullable = false)
  private String age;

  @Column(nullable = false)
  private String location;

  @Column(nullable = false)
  private String interest;
  private String keyword;

  @CreatedDate
  private LocalDateTime createdAt;

  @Builder
  public UserSearch(BoardCategory category, String gender, String age, String location,
      String interest,
      String keyword) {
    this.category = category;
    this.gender = gender;
    this.age = age;
    this.location = location;
    this.interest = interest;
    this.keyword = keyword;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    UserSearch that = (UserSearch) o;
    return Objects.equals(getId(), that.getId());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getId());
  }
}
