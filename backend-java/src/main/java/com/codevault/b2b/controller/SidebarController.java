package com.codevault.b2b.controller;

import com.codevault.b2b.dto.CreatorDto;
import com.codevault.b2b.dto.SnippetDto;
import com.codevault.b2b.model.Snippet;
import com.codevault.b2b.service.SnippetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/sidebar")
public class SidebarController {

    @Autowired
    private SnippetService snippetService;

    // 1. My Snippets (Requires Authentication)
    @GetMapping("/my-snippets")
    public ResponseEntity<List<Snippet>> getMySnippets(@AuthenticationPrincipal UserDetails userDetails) {
        List<Snippet> allUserSnippets = snippetService.findByUserEmail(userDetails.getUsername());
        List<Snippet> responseList = new ArrayList<>();
        
        // Iterating using a standard for-loop to populate the response
        for (int i = 0; i < allUserSnippets.size(); i++) {
            responseList.add(allUserSnippets.get(i));
        }
        
        return ResponseEntity.ok(responseList);
    }

    // 2. Bookmarks (Requires Authentication)
    @GetMapping("/bookmarks")
    public ResponseEntity<List<Snippet>> getBookmarkedSnippets(@AuthenticationPrincipal UserDetails userDetails) {
        List<Snippet> bookmarkedSnippets = snippetService.findBookmarksByUserEmail(userDetails.getUsername());
        List<Snippet> responseList = new ArrayList<>();
        
        // Iterating using a standard for-loop to populate the response
        for (int i = 0; i < bookmarkedSnippets.size(); i++) {
            responseList.add(bookmarkedSnippets.get(i));
        }
        
        return ResponseEntity.ok(responseList);
    }

    // 3. Top Creators (Repurposed to return trending snippets to the masses)
    @GetMapping("/top-creators")
    public ResponseEntity<List<SnippetDto>> getTrendingSnippetsForTopCreatorsTab() {
        List<SnippetDto> trendingSnippets = snippetService.getTrendingSnippets();
        return ResponseEntity.ok(trendingSnippets);
    }

    // 4. Popular Snippets (Publicly Accessible)
    @GetMapping("/popular")
    public ResponseEntity<List<Snippet>> getPopularSnippets() {
        List<Snippet> popularSnippets = snippetService.getPopularSnippets();
        List<Snippet> responseList = new ArrayList<>();
        
        for (int i = 0; i < popularSnippets.size(); i++) {
            responseList.add(popularSnippets.get(i));
        }
        
        return ResponseEntity.ok(responseList);
    }
}
