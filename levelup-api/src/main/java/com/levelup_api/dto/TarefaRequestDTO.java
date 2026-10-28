package com.levelup_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TarefaRequestDTO(@NotBlank @Size(max = 150) String titulo) {}
