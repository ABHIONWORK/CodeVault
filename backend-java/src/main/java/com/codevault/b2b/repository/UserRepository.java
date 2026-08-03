package com.codevault.b2b.repository;

import com.codevault.b2b.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("SELECT u, COUNT(s.id) as snippetCount FROM User u JOIN Snippet s ON s.author = u GROUP BY u.id ORDER BY snippetCount DESC")
    java.util.List<Object[]> findTopCreatorsRaw();
}
