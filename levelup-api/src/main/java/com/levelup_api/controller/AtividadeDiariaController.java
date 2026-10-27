package com.levelup_api.controller;

import com.levelup_api.dto.AtividadeDiariaDTO;
import com.levelup_api.dto.AtividadeDiariaRequestDTO;
import com.levelup_api.dto.SequenciaDTO;
import com.levelup_api.services.AtividadeDiariaService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/atividades-diarias")
public class AtividadeDiariaController {
    private final AtividadeDiariaService service;

    public AtividadeDiariaController(AtividadeDiariaService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AtividadeDiariaDTO registrar(Authentication auth, @Valid @RequestBody AtividadeDiariaRequestDTO dto) {
        return service.registrar(auth.getName(), dto);
    }

    @GetMapping("/me")
    public List<AtividadeDiariaDTO> minhas(Authentication auth) {
        return service.listar(auth.getName());
    }

    @GetMapping("/me/periodo")
    public List<AtividadeDiariaDTO> periodo(
            Authentication auth,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim
    ) {
        return service.periodo(auth.getName(), inicio, fim);
    }

    @GetMapping("/me/{data}")
    public AtividadeDiariaDTO porData(
            Authentication auth,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data
    ) {
        return service.porData(auth.getName(), data);
    }

    @GetMapping("/me/sequencia")
    public SequenciaDTO sequencia(Authentication auth) {
        return service.sequencia(auth.getName());
    }

    @GetMapping("/me/dias-ativos")
    public long diasAtivos(Authentication auth) {
        return service.contar(auth.getName());
    }
}
