package com.levelup_api.dto;

public record EstatisticaUsuarioDTO(Long usuarioId, Long xpTotal, Integer nivel, Integer vitorias,
                                    Integer derrotas, double percentualVitorias) {}
