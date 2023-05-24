package com.seoul_competition.senior_jobtraining.domain.education.dao;

import com.seoul_competition.senior_jobtraining.domain.education.dto.response.Recommend.RecommendationEducationsDto;
import com.seoul_competition.senior_jobtraining.domain.education.entity.Education;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

public interface EducationRepository extends JpaRepository<Education, Long>,
    QuerydslPredicateExecutor<Education> {

  Page<Education> findByNameContainingOrderByStatusDesc(Pageable pageable, String name);

  Optional<Education> findByOriginId(Long originId);

  @Query(
      "SELECT new com.seoul_competition.senior_jobtraining.domain.education.dto.response.Recommend"
          + ".RecommendationEducationsDto(e.id, e.name, e.status, CASE WHEN e.price IS NULL THEN null "
          + "ELSE CAST(e.price AS java.lang.String) END, e.capacity, e.registerStart"
          + ", e.registerEnd, e.educationStart, e.educationEnd, e.url, e.hits) "
          + "FROM Education e WHERE e.id IN :ids")
  List<RecommendationEducationsDto> recommendQuery(List<Long> ids);


  List<Education> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);

  @Query("SELECT e FROM Education e WHERE e.id IN :educationIds ORDER BY FIND_IN_SET(e.id, :educationIdsAsString)")
  List<Education> findByIdInOrderByCustomSort(@Param("educationIds") List<Long> educationIds,
      @Param("educationIdsAsString") String educationIdsAsString);

  int countByOriginIdLessThanEqual(long originId);

  int countByOriginIdGreaterThanEqual(long originId);
}
