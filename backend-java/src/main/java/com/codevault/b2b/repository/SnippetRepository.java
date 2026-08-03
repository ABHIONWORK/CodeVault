package com.codevault.b2b.repository;

import com.codevault.b2b.model.Snippet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SnippetRepository extends JpaRepository<Snippet, Long> {
    
    // Custom query to ensure users only see their PRIVATE snippets, or ORGANIZATION/PUBLIC snippets from their org
    // Note: The @Filter("tenantFilter") will handle the organization isolation automatically for ORGANIZATION snippets.
    // But we still need to filter PRIVATE snippets to only the author.
    
    @Query("SELECT s FROM Snippet s WHERE " +
           "(s.visibility = 'PUBLIC') OR " +
           "(s.visibility = 'ORGANIZATION' AND s.organization.id = :orgId) OR " +
           "(s.visibility = 'PRIVATE' AND s.author.id = :userId)")
    List<Snippet> findVisibleSnippets(@Param("orgId") Long orgId, @Param("userId") Long userId);

    List<Snippet> findByAuthorEmail(String email);

    @Query("SELECT s FROM Snippet s JOIN User u ON s IN elements(u.bookmarkedSnippets) WHERE u.email = :email")
    List<Snippet> findBookmarksByUserEmail(@Param("email") String email);

    List<Snippet> findTop10ByOrderByBookmarksCountDesc();
}
