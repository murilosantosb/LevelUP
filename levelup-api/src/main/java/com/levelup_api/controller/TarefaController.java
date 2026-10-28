package com.levelup_api.controller;

import com.levelup_api.dto.*;
import com.levelup_api.services.TarefaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {
    private final TarefaService tarefas;

    public TarefaController(TarefaService tarefas) {
        this.tarefas = tarefas;
    }

    @GetMapping("/me")
    public List<TarefaDTO> listar(Authentication auth) {
        return tarefas.listar(auth.getName());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TarefaDTO criar(Authentication auth, @Valid @RequestBody TarefaRequestDTO dto) {
        return tarefas.criar(auth.getName(), dto);
    }

    @PutMapping("/{id}/concluir")
    public ConclusaoTarefaDTO concluir(Authentication auth, @PathVariable Long id) {
        return tarefas.concluir(auth.getName(), id);
    }
}
