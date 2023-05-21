package com.seoul_competition.senior_jobtraining.domain.education.entity;

import com.seoul_competition.senior_jobtraining.domain.review.entity.Review;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.lang.String;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Table(name = "education")
public class Education {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(name = "price", nullable = false)
  private Integer price;
  @Column(name = "capacity", nullable = false)
  private Integer capacity;
  @Column(name = "name", nullable = false)
  private String name;
  @Column(name = "status", nullable = false)
  private String status;
  @Column(name = "url", nullable = false)
  private String url;
  @Column(name = "register_start", nullable = false)
  private LocalDate registerStart;
  @Column(name = "register_end", nullable = false)
  private LocalDate registerEnd;
  @Column(name = "education_start", nullable = false)
  private LocalDate educationStart;
  @Column(name = "education_end", nullable = false)
  private LocalDate educationEnd;

  @Column(name = "hits", nullable = false)
  private Long hits;

  @OneToMany(mappedBy = "education", cascade = CascadeType.REMOVE)
  private List<Review> reviews = new ArrayList<>();

  @CreatedDate
  @Column(nullable = false)
  private LocalDateTime createdAt;

  @Column(name = "origin_id", nullable = false)
  private int originId;

  @Builder
  public Education(String name, String status, String url, Integer price, Integer capacity,
      LocalDate registerStart, LocalDate registerEnd, LocalDate educationStart,
      LocalDate educationEnd, Long hits, int originId) {

    this.name = name;
    this.status = status;
    this.url = url;
    this.price = price;
    this.capacity = capacity;
    this.registerStart = registerStart;
    this.registerEnd = registerEnd;
    this.educationStart = educationStart;
    this.educationEnd = educationEnd;
    this.hits = hits;
    this.originId = originId;
  }

  public void hitsPlus() {
    this.hits++;
  }
}
