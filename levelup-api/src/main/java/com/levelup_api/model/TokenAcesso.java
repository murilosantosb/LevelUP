package com.levelup_api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.Instant;

@Entity
@Table(name = "tokens_acesso")
@Getter
@NoArgsConstructor
public class TokenAcesso {
    @Id
    @Column(length = 64)
    private String hash;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @org.hibernate.annotations.OnDelete(action = org.hibernate.annotations.OnDeleteAction.CASCADE)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private Instant expiraEm;

    public TokenAcesso(String hash, Usuario usuario, Instant expiraEm) {
        this.hash = hash;
        this.usuario = usuario;
        this.expiraEm = expiraEm;
    }
}
