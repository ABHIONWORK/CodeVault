package com.codevault.b2b.controller;

import com.codevault.b2b.model.AuditLog;
import com.codevault.b2b.model.Snippet;
import com.codevault.b2b.repository.AuditLogRepository;
import com.codevault.b2b.repository.SnippetRepository;
import com.codevault.b2b.security.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/workspace")
public class WorkspaceController {

    private final SnippetRepository snippetRepository;
    private final AuditLogRepository auditLogRepository;

    public WorkspaceController(SnippetRepository snippetRepository, AuditLogRepository auditLogRepository) {
        this.snippetRepository = snippetRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @GetMapping("/library")
    public ResponseEntity<List<Map<String, Object>>> getTeamLibrary(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<Snippet> snippets = snippetRepository.findVisibleSnippets(userDetails.getOrganizationId(), userDetails.getId());
        List<Map<String, Object>> response = new ArrayList<>();

        // STRICT RULE: standard index-based for loop for DTO mapping
        for (int i = 0; i < snippets.size(); i++) {
            Snippet snippet = snippets.get(i);
            Map<String, Object> dto = new HashMap<>();
            dto.put("id", snippet.getId());
            dto.put("title", snippet.getTitle());
            dto.put("author", snippet.getAuthor() != null ? snippet.getAuthor().getUsername() : "Unknown");
            response.add(dto);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/billing")
    public ResponseEntity<Map<String, Object>> getBillingInfo(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Map<String, Object> response = new HashMap<>();
        response.put("organizationId", userDetails.getOrganizationId());
        response.put("plan", "PRO");
        response.put("status", "ACTIVE");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/audit-trails")
    public ResponseEntity<List<Map<String, Object>>> getAuditTrails(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<AuditLog> logs = auditLogRepository.findByOrganizationIdOrderByTimestampDesc(userDetails.getOrganizationId());
        List<Map<String, Object>> response = new ArrayList<>();

        // STRICT RULE: standard index-based for loop for DTO mapping
        for (int i = 0; i < logs.size(); i++) {
            AuditLog log = logs.get(i);
            Map<String, Object> dto = new HashMap<>();
            dto.put("id", log.getId());
            dto.put("action", log.getAction());
            dto.put("user", log.getUser().getUsername());
            dto.put("timestamp", log.getTimestamp());
            response.add(dto);
        }

        return ResponseEntity.ok(response);
    }
}
