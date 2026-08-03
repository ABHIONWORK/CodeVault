package com.codevault.b2b.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SnippetDto {
    private Long id;
    private String title;
    private String code;
    private String language;
    private String author;
}
