package com.levelup_api.dto;

import java.time.Instant;

public record PublicacaoDTO(Long id, UsuarioPublicoDTO autor, String texto, String fotoUrl, Instant dataCriacao) {}
