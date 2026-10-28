package com.levelup_api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.Instant;

@Entity
@Table(name = "tarefas")
@Getter
@NoArgsConstructor
public class Tarefa {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false, length = 150)
    private String titulo;

    @Column(nullable = false)
    private boolean concluida;

    @Column(nullable = false)
    private Instant dataCriacao;

    private Instant dataConclusao;

    public Tarefa(Usuario usuario, String titulo) {
        this.usuario = usuario;
        this.titulo = titulo;
        this.dataCriacao = Instant.now();
    }

    public void concluir() {
        this.concluida = true;
        this.dataConclusao = Instant.now();
    }
}
