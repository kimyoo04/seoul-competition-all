package com.seoul_competition.senior_jobtraining.domain.user.dao;

import com.seoul_competition.senior_jobtraining.domain.education.entity.Education;
import com.seoul_competition.senior_jobtraining.domain.user.entity.UserDetail;
import java.util.List;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserDetailRepository extends JpaRepository<UserDetail, Long> {

  @Query("SELECT ud.postId, COUNT(ud.postId) AS postCount " +
      "FROM UserDetail ud " +
      "WHERE ud.category = 1 " +
      "AND ud.interest = :interest " +
      "GROUP BY ud.postId " +
      "ORDER BY postCount DESC " +
      "LIMIT 5")
  List<Object[]> getTop5PostCountsByInterestAndCategory(@Param("interest") String interest);
}
