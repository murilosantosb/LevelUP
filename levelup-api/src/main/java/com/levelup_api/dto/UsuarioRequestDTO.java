package com.levelup_api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

public record UsuarioRequestDTO(
        @NotBlank(message = "Campo nome não pode está vazio.")
        @Length(min = 3, max = 100)
        String nome,

        @NotBlank(message = "Campo username não pode está vazio.")
        @Length(min = 3, max = 30)
        String username,

        @NotBlank(message = "Campo email não pode está vazio.")
        @Email
        String email,

        @NotBlank(message = "Campo senha não pode está vazio.")
        @Length(min = 6, max = 20)
        String senhaHash,

        String avatarUrl
) {}
