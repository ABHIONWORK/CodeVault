package com.codevault.b2b.controller;

import com.codevault.b2b.model.Organization;
import com.codevault.b2b.model.SubscriptionTier;
import com.codevault.b2b.repository.OrganizationRepository;
import com.codevault.b2b.security.UserDetailsImpl;
import com.codevault.b2b.service.StripeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/billing")
public class BillingController {

    private final StripeService stripeService;
    private final OrganizationRepository organizationRepository;

    public BillingController(StripeService stripeService, OrganizationRepository organizationRepository) {
        this.stripeService = stripeService;
        this.organizationRepository = organizationRepository;
    }

    @PostMapping("/checkout")
    public ResponseEntity<Map<String, String>> createCheckoutSession(
            @RequestBody Map<String, String> payload, 
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        
        Organization org = organizationRepository.findById(userDetails.getOrganizationId()).orElseThrow();
        String priceId = payload.get("priceId"); // e.g., price_pro_monthly
        
        String checkoutUrl = stripeService.createCheckoutSession(org, priceId);
        return ResponseEntity.ok(Map.of("url", checkoutUrl));
    }

    @PostMapping("/portal")
    public ResponseEntity<Map<String, String>> createCustomerPortalSession(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Organization org = organizationRepository.findById(userDetails.getOrganizationId()).orElseThrow();
        
        String portalUrl = stripeService.createCustomerPortalSession(org);
        return ResponseEntity.ok(Map.of("url", portalUrl));
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        // Real implementation: verify sigHeader using Event.constructEvent
        // Parse event type (customer.subscription.updated, customer.subscription.deleted)
        // Find organization by customerId and update SubscriptionTier
        
        System.out.println("Received Stripe Webhook! Payload: " + payload);
        return ResponseEntity.ok("Webhook Received");
    }
}
