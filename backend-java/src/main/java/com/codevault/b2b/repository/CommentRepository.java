package com.codevault.b2b.repository;

import com.codevault.b2b.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findBySnippetIdOrderByCreatedAtAsc(Long snippetId);
}
