package com.seoul_competition.senior_jobtraining.domain.post.entity;

import static jakarta.persistence.CascadeType.REMOVE;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import com.seoul_competition.senior_jobtraining.domain.comment.entity.Comment;
import com.seoul_competition.senior_jobtraining.global.error.ErrorCode;
import com.seoul_competition.senior_jobtraining.global.error.exception.BusinessException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = PROTECTED)
@Entity
@Table(name = "post")
public class Post {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String nickname;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  private String title;

  @Lob
  @Column(nullable = false)
  private String content;

  @CreatedDate
  @Column(nullable = false)
  private LocalDateTime createdAt;

  @LastModifiedDate
  @Column(nullable = false)
  private LocalDateTime updatedAt;

  @Column(columnDefinition = "BIGINT default 0", nullable = false)
  private Long hits;

  @OneToMany(mappedBy = "post", cascade = REMOVE)
  private final List<Comment> comments = new ArrayList<>();

  @Builder
  private Post(String nickname, String password, String title, String content,
      LocalDateTime createdAt, LocalDateTime updatedAt, Long hits) {
    this.nickname = nickname;
    this.password = password;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.hits = hits;
  }

  public void addHits() {
    this.hits++;
  }

  public void checkPassword(String password) {
    if (!Objects.equals(this.password, password)) {
      throw new BusinessException(ErrorCode.PASSWORD_MISMATCH);
    }
  }

  public void update(String nickname, String title, String content) {
    this.nickname = nickname;
    this.title = title;
    this.content = content;
  }

  @Override
  public boolean equals(Object obj) {
    if (obj == this) {
      return true;
    }
    if (!(obj instanceof Post other)) {
      return false;
    }
    return Objects.equals(this.id, other.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(this.id);
  }

}
