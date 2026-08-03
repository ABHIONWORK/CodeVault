package com.codevault.b2b.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String action; // CREATE, UPDATE, DELETE
    
    private String entityType; // SNIPPET
    
    private Long entityId;

    private Long userId;
    
    private Long organizationId;

    private LocalDateTime timestamp;
    
    @PrePersist
    protected void onCreate() {
        timestamp = LocalDateTime.now();
    }
}
