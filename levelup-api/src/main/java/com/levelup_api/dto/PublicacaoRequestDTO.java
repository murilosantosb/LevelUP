package com.levelup_api.dto;

import jakarta.validation.constraints.Size;

public record PublicacaoRequestDTO(@Size(max = 2000) String texto, @Size(max = 2048) String fotoUrl) {}
