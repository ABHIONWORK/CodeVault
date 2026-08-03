package com.codevault.b2b.controller;

import com.codevault.b2b.model.Comment;
import com.codevault.b2b.model.Snippet;
import com.codevault.b2b.model.User;
import com.codevault.b2b.repository.CommentRepository;
import com.codevault.b2b.repository.SnippetRepository;
import com.codevault.b2b.repository.UserRepository;
import com.codevault.b2b.security.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/snippets")
public class SnippetController {

    private final SnippetRepository snippetRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    public SnippetController(SnippetRepository snippetRepository, CommentRepository commentRepository, UserRepository userRepository) {
        this.snippetRepository = snippetRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    @org.springframework.cache.annotation.Cacheable(value = "snippetsCache", key = "#userDetails.organizationId + '-' + #userDetails.id")
    public ResponseEntity<List<Snippet>> getAllSnippets(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<Snippet> snippets = snippetRepository.findVisibleSnippets(userDetails.getOrganizationId(), userDetails.getId());
        return ResponseEntity.ok(snippets);
    }

    @PostMapping
    public ResponseEntity<Snippet> createSnippet(@RequestBody Snippet snippet, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        User author = userRepository.findById(userDetails.getId()).orElseThrow();
        snippet.setAuthor(author);
        snippet.setOrganization(author.getOrganization());
        
        Snippet saved = snippetRepository.save(snippet);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long id) {
        return ResponseEntity.ok(commentRepository.findBySnippetIdOrderByCreatedAtAsc(id));
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<Comment> addComment(@PathVariable Long id, @RequestBody Map<String, String> payload, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Snippet snippet = snippetRepository.findById(id).orElseThrow();
        User author = userRepository.findById(userDetails.getId()).orElseThrow();

        Comment comment = Comment.builder()
                .content(payload.get("content"))
                .snippet(snippet)
                .author(author)
                .build();

        return ResponseEntity.ok(commentRepository.save(comment));
    }
}
