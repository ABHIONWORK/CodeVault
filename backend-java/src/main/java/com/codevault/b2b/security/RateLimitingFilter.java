package com.codevault.b2b.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;

@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    // Global bucket for demonstration (100 requests per minute)
    // For production, this should be per-tenant/per-user using a ConcurrentHashMap or Redis.
    private final Bucket bucket;

    public RateLimitingFilter() {
        Bandwidth limit = Bandwidth.classic(100, Refill.greedy(100, Duration.ofMinutes(1)));
        this.bucket = Bucket.builder()
                .addLimit(limit)
                .build();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        if (request.getRequestURI().startsWith("/api/")) {
            if (bucket.tryConsume(1)) {
                filterChain.doFilter(request, response);
            } else {
                response.setStatus(429); // Too Many Requests
                response.getWriter().write("Rate limit exceeded. Please try again later.");
            }
        } else {
            filterChain.doFilter(request, response);
        }
    }
}
