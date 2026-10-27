package com.levelup_api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UsuarioAtualizacaoDTO(
        @NotBlank @Size(min = 3, max = 100) String nome,
        @NotBlank @Size(min = 3, max = 30) String username,
        @NotBlank @Email String email,
        String avatarUrl
) {}
