package com.seoul_competition.senior_jobtraining.domain.comment.dao;

import com.seoul_competition.senior_jobtraining.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
