package com.levelup_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "estatisticas_usuarios")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EstatisticaUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false, unique = true)
    private Usuario usuario;

    @Column(nullable = false)
    private Long xpTotal;

    @Column(nullable = false)
    private Integer nivel;

    @Column(nullable = false)
    private Integer vitorias;

    @Column(nullable = false)
    private Integer derrotas;

    @PrePersist
    protected void initDefaults() {
        if (this.xpTotal == null) this.xpTotal = 0L;
        if (this.nivel == null) this.nivel = 1;
        if (this.vitorias == null) this.vitorias = 0;
        if (this.derrotas == null) this.derrotas = 0;
    }
}
