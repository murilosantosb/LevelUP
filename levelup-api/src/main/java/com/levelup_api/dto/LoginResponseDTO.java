package com.levelup_api.dto;

import java.time.Instant;

public record LoginResponseDTO(String token, Instant expiraEm, UsuarioPublicoDTO usuario) {}
