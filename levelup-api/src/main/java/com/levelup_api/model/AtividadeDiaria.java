package com.levelup_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(
    name = "atividades_diarias",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"usuario_id", "data"})
    }
)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AtividadeDiaria {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private Integer xpGanho;

    @Column(nullable = false)
    private Integer tarefasConcluidas;

    @PrePersist
    protected void initDefaults() {
        if (this.xpGanho == null) this.xpGanho = 0;
        if (this.tarefasConcluidas == null) this.tarefasConcluidas = 0;
    }
}
