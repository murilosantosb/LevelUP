package com.levelup_api.dto;

import java.time.LocalDate;

public record AtividadeDiariaDTO(LocalDate data, Integer xpGanho, Integer tarefasConcluidas) {}
