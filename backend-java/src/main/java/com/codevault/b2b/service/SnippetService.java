package com.codevault.b2b.service;

import com.codevault.b2b.dto.CreatorDto;
import com.codevault.b2b.dto.SnippetDto;
import com.codevault.b2b.model.Snippet;
import com.codevault.b2b.model.User;
import com.codevault.b2b.repository.SnippetRepository;
import com.codevault.b2b.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SnippetService {

    @Autowired
    private SnippetRepository snippetRepository;
    
    @Autowired
    private UserRepository userRepository;

    public List<Snippet> findByUserEmail(String email) {
        return snippetRepository.findByAuthorEmail(email);
    }

    public List<Snippet> findBookmarksByUserEmail(String email) {
        return snippetRepository.findBookmarksByUserEmail(email);
    }

    public List<CreatorDto> getTopCreators() {
        List<Object[]> results = userRepository.findTopCreatorsRaw();
        List<CreatorDto> topCreators = new ArrayList<>();
        
        for (int i = 0; i < results.size(); i++) {
            Object[] row = results.get(i);
            User u = (User) row[0];
            long count = ((Number) row[1]).longValue();
            topCreators.add(new CreatorDto(u.getId(), u.getName(), u.getEmail(), count));
        }
        return topCreators;
    }
    
    public List<Snippet> getPopularSnippets() {
        return snippetRepository.findTop10ByOrderByBookmarkCountDesc();
    }

    public List<SnippetDto> getTrendingSnippets() {
        List<Snippet> allSnippets = snippetRepository.findAll();
        
        // Sort snippets based on the weighted popularity formula
        allSnippets.sort((s1, s2) -> {
            int score1 = (s1.getBookmarkCount() * 5) + (s1.getCopyCount() * 3) + (s1.getViewCount() * 1);
            int score2 = (s2.getBookmarkCount() * 5) + (s2.getCopyCount() * 3) + (s2.getViewCount() * 1);
            
            // Descending order: highest score first
            return Integer.compare(score2, score1);
        });

        List<SnippetDto> trendingDtos = new ArrayList<>();
        
        // Limit to top 20 trending snippets using a standard for loop
        int limit = Math.min(20, allSnippets.size());
        for (int i = 0; i < limit; i++) {
            trendingDtos.add(convertToDto(allSnippets.get(i)));
        }
        
        return trendingDtos;
    }

    // Helper method to map Entity to DTO
    private SnippetDto convertToDto(Snippet snippet) {
        SnippetDto dto = new SnippetDto();
        dto.setId(snippet.getId());
        dto.setTitle(snippet.getTitle());
        dto.setCode(snippet.getCode());
        dto.setLanguage(snippet.getLanguage());
        dto.setAuthor(snippet.getAuthor().getName()); // Note: using getAuthor() because user uses getAuthor()
        return dto;
    }
}
