package com.codevault.b2b.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
public class CacheConfig {
    // Basic Redis configuration enabled by @EnableCaching and spring-boot-starter-data-redis
    // Spring Boot auto-configures RedisCacheManager.
}
