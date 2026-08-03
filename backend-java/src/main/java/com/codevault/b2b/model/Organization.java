package com.codevault.b2b.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "organizations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SubscriptionTier tier = SubscriptionTier.FREE;

    private String stripeCustomerId;
    private String stripeSubscriptionId;

    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL)
    private List<User> users;
}
