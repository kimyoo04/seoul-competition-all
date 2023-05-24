package com.seoul_competition.senior_jobtraining.domain.user.dao;

import com.seoul_competition.senior_jobtraining.domain.user.entity.UserSearch;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserSearchRepository extends JpaRepository<UserSearch, Long> {

  @Query("SELECT us.keyword, COUNT(us.id) " +
      "FROM UserSearch us " +
      "WHERE us.category = 1 " +
      "GROUP BY us.keyword " +
      "ORDER BY COUNT(us.id) DESC " +
      "LIMIT 5")
  List<Object[]> getUserSearchCountByKeyword();

  @Query("SELECT us.keyword, COUNT(us.id) " +
      "FROM UserSearch us " +
      "WHERE us.category = 1 " +
      "AND us.age = :ages " +
      "GROUP BY us.keyword " +
      "ORDER BY COUNT(us.id) DESC " +
      "LIMIT 5")
  List<Object[]> getUserSearchCountByKeywordAndAges(@Param("ages") String ages);
}
