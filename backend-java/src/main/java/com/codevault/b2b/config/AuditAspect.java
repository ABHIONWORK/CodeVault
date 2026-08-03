package com.codevault.b2b.config;

import com.codevault.b2b.model.AuditLog;
import com.codevault.b2b.model.Snippet;
import com.codevault.b2b.repository.AuditLogRepository;
import com.codevault.b2b.security.UserDetailsImpl;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AuditAspect {

    private final AuditLogRepository auditLogRepository;

    public AuditAspect(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @AfterReturning(pointcut = "execution(* com.codevault.b2b.repository.SnippetRepository.save(..))", returning = "result")
    public void logSnippetSave(JoinPoint joinPoint, Object result) {
        if (result instanceof Snippet) {
            Snippet snippet = (Snippet) result;
            createLog("CREATE_OR_UPDATE", "SNIPPET", snippet.getId());
        }
    }

    @AfterReturning(pointcut = "execution(* com.codevault.b2b.repository.SnippetRepository.delete*(..))")
    public void logSnippetDelete(JoinPoint joinPoint) {
        // Simple demonstration. Real implementation might need the ID from arguments.
        createLog("DELETE", "SNIPPET", null);
    }

    private void createLog(String action, String entityType, Long entityId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof UserDetailsImpl) {
            UserDetailsImpl user = (UserDetailsImpl) auth.getPrincipal();

            AuditLog log = AuditLog.builder()
                    .action(action)
                    .entityType(entityType)
                    .entityId(entityId)
                    .userId(user.getId())
                    .organizationId(user.getOrganizationId())
                    .build();

            auditLogRepository.save(log);
        }
    }
}
