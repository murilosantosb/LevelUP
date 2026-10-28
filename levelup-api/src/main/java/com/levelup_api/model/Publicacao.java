package com.levelup_api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.Instant;

@Entity
@Table(name = "publicacoes")
@Getter
@NoArgsConstructor
public class Publicacao {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false, length = 2000)
    private String texto;

    @Column(length = 2048)
    private String fotoUrl;

    @Column(nullable = false)
    private Instant dataCriacao;

    public Publicacao(Usuario usuario, String texto, String fotoUrl) {
        this.usuario = usuario;
        this.texto = texto;
        this.fotoUrl = fotoUrl;
        this.dataCriacao = Instant.now();
    }
}
