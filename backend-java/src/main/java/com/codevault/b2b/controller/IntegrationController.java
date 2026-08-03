package com.codevault.b2b.controller;

import com.codevault.b2b.model.Snippet;
import com.codevault.b2b.repository.SnippetRepository;
import com.codevault.b2b.service.AiService;
import com.codevault.b2b.service.GitHubIntegrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/integration")
public class IntegrationController {

    private final AiService aiService;
    private final GitHubIntegrationService githubService;
    private final SnippetRepository snippetRepository;

    public IntegrationController(AiService aiService, GitHubIntegrationService githubService, SnippetRepository snippetRepository) {
        this.aiService = aiService;
        this.githubService = githubService;
        this.snippetRepository = snippetRepository;
    }

    @PostMapping("/ai/suggest")
    public ResponseEntity<Map<String, String>> generateSuggestion(@RequestBody Map<String, String> payload) {
        String code = payload.get("code");
        String prompt = payload.get("prompt");
        
        String result = aiService.generateSuggestion(code, prompt);
        return ResponseEntity.ok(Map.of("suggestion", result));
    }

    @PostMapping("/github/push/{snippetId}")
    public ResponseEntity<Map<String, String>> pushToGitHub(
            @PathVariable Long snippetId,
            @RequestBody Map<String, Object> payload) {
        
        Snippet snippet = snippetRepository.findById(snippetId).orElseThrow();
        String targetType = (String) payload.get("targetType"); // "GIST" or "REPO"
        String githubToken = (String) payload.get("githubToken"); // In reality, this would be fetched from the User entity's linked OAuth accounts
        
        String url;
        if ("GIST".equals(targetType)) {
            boolean isPublic = (boolean) payload.getOrDefault("isPublic", false);
            url = githubService.pushToGist(snippet, githubToken, isPublic);
        } else {
            String repoName = (String) payload.get("repoName");
            String filePath = (String) payload.get("filePath");
            url = githubService.pushToRepository(snippet, githubToken, repoName, filePath);
        }

        return ResponseEntity.ok(Map.of("url", url, "status", "SUCCESS"));
    }
}
