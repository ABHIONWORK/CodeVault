package com.codevault.b2b.config;

import com.codevault.b2b.security.UserDetailsImpl;
import jakarta.persistence.EntityManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.hibernate.Session;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Component
public class TenantInterceptor implements HandlerInterceptor {

    private final EntityManager entityManager;

    public TenantInterceptor(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetailsImpl) {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long orgId = userDetails.getOrganizationId();

            if (orgId != null) {
                Session session = entityManager.unwrap(Session.class);
                session.enableFilter("tenantFilter").setParameter("organizationId", orgId);
            }
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) {
        Session session = entityManager.unwrap(Session.class);
        session.disableFilter("tenantFilter");
    }
}
