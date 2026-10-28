package com.levelup_api.dto;

import java.time.Instant;

public record TarefaDTO(Long id, String titulo, boolean concluida, int xpRecompensa,
                        Instant dataCriacao, Instant dataConclusao) {}
