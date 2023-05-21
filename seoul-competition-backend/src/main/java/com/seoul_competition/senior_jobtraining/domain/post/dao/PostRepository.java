package com.seoul_competition.senior_jobtraining.domain.post.dao;

import com.seoul_competition.senior_jobtraining.domain.post.entity.Post;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Long>, QuerydslPredicateExecutor<Post> {

  @Query("SELECT p FROM Post p LEFT JOIN FETCH p.comments WHERE p.id = :id")
  Optional<Post> findByIdWithComments(@Param("id") Long id);

  @Query(value = "SELECT p FROM Post p LEFT JOIN FETCH p.comments ORDER BY p.createdAt DESC",
      countQuery = "SELECT count(p) FROM Post p")
  List<Post> findAllWithComments(Pageable pageable);

  @Query("SELECT count(p) FROM Post p")
  int getTotalCount();

  @Query("SELECT p FROM Post p WHERE p.title LIKE %:searchValue% OR p.content LIKE %:searchValue%")
  Page<Post> findByTitleOrContent(@Param("searchValue") String searchValue, Pageable pageable);

  @Query(
      "SELECT p FROM Post p WHERE (:searchValue IS NULL OR p.title LIKE %:searchValue% OR p.content LIKE %:searchValue%) "
          +
          "AND (:startDate IS NULL OR p.createdAt >= :startDate) AND (:endDate IS NULL OR p.createdAt <= :endDate)")
  Page<Post> findBySearchValueAndCreatedAtBetween(@Param("searchValue") String searchValue,
      @Param("startDate") LocalDateTime startDate,
      @Param("endDate") LocalDateTime endDate,
      Pageable pageable);

  List<Post> findTop5ByOrderByHitsDesc();
}
