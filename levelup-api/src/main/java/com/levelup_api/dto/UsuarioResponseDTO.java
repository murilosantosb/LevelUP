package com.levelup_api.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record UsuarioResponseDTO(
        Long id,
        String nome,
        String username,
        String email,
        String avatarUrl,
        LocalDateTime dataCriacao
) {}
