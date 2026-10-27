package com.levelup_api.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.time.LocalDate;

public record AtividadeDiariaRequestDTO(LocalDate data,
        @NotNull @PositiveOrZero Integer tarefasConcluidas) {}
