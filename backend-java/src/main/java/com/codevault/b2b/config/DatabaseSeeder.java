package com.codevault.b2b.config;

import com.codevault.b2b.model.Snippet;
import com.codevault.b2b.model.Visibility;
import com.codevault.b2b.repository.SnippetRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final SnippetRepository snippetRepository;

    public DatabaseSeeder(SnippetRepository snippetRepository) {
        this.snippetRepository = snippetRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (snippetRepository.count() == 0) {
            String[] titles = {
                "React Hooks Boilerplate",
                "Spring Boot Security Config",
                "Node.js Express Server Setup",
                "Python Data Processing Script",
                "Docker Compose for Postgres"
            };
            String[] codes = {
                "import { useState, useEffect } from 'react';\n\nexport const useFetch = (url) => {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    fetch(url).then(res => res.json()).then(setData);\n  }, [url]);\n  return data;\n}",
                "@Configuration\n@EnableWebSecurity\npublic class SecurityConfig extends WebSecurityConfigurerAdapter {\n  @Override\n  protected void configure(HttpSecurity http) throws Exception {\n    http.csrf().disable().authorizeRequests().anyRequest().permitAll();\n  }\n}",
                "const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => res.send('Hello World!'));\napp.listen(3000, () => console.log('Server running on port 3000'));",
                "import pandas as pd\n\ndef process_data(file_path):\n    df = pd.read_csv(file_path)\n    df.dropna(inplace=True)\n    return df.groupby('category').mean()",
                "version: '3.8'\nservices:\n  db:\n    image: postgres:13\n    environment:\n      POSTGRES_USER: user\n      POSTGRES_PASSWORD: password\n    ports:\n      - '5432:5432'"
            };
            int[] viewCounts = { 1500, 1200, 800, 300, 100 };
            int[] copyCounts = { 300, 200, 150, 50, 10 };
            int[] bookmarkCounts = { 100, 80, 40, 20, 5 };
            
            // STRICT RULE: standard index-based for loop
            for (int i = 0; i < 5; i++) {
                Snippet snippet = new Snippet();
                snippet.setTitle(titles[i]);
                snippet.setCode(codes[i]);
                snippet.setLanguage("mixed");
                snippet.setVisibility(Visibility.PUBLIC);
                snippet.setViewCount(viewCounts[i]);
                snippet.setCopyCount(copyCounts[i]);
                snippet.setBookmarkCount(bookmarkCounts[i]);
                
                snippetRepository.save(snippet);
            }
            
            System.out.println("DatabaseSeeder: Injected 5 dummy snippets.");
        }
    }
}
