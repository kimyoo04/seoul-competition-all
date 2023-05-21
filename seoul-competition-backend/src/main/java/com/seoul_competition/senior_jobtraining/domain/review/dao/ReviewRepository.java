package com.seoul_competition.senior_jobtraining.domain.review.dao;

import com.seoul_competition.senior_jobtraining.domain.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}
