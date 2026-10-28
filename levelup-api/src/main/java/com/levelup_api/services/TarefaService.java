package com.levelup_api.services;

import com.levelup_api.dto.*;
import com.levelup_api.model.Tarefa;
import com.levelup_api.repository.TarefaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class TarefaService {
    private final TarefaRepository tarefas;
    private final UsuarioService usuarios;
    private final AtividadeDiariaService atividades;

    public TarefaService(TarefaRepository tarefas, UsuarioService usuarios, AtividadeDiariaService atividades) {
        this.tarefas = tarefas;
        this.usuarios = usuarios;
        this.atividades = atividades;
    }

    @Transactional(readOnly = true)
    public List<TarefaDTO> listar(String principal) {
        return tarefas.findByUsuarioIdOrderByConcluidaAscDataCriacaoDesc(usuarios.atual(principal).getId())
                .stream().map(this::dto).toList();
    }

    @Transactional
    public TarefaDTO criar(String principal, TarefaRequestDTO request) {
        return dto(tarefas.save(new Tarefa(usuarios.atual(principal), request.titulo().trim())));
    }

    @Transactional
    public ConclusaoTarefaDTO concluir(String principal, Long id) {
        var usuario = usuarios.atualParaAtualizacao(principal);
        var tarefa = tarefas.findByIdAndUsuarioId(id, usuario.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tarefa não encontrada."));
        if (tarefa.isConcluida()) return new ConclusaoTarefaDTO(dto(tarefa), 0);
        tarefa.concluir();
        atividades.registrarConclusao(usuario);
        tarefas.save(tarefa);
        return new ConclusaoTarefaDTO(dto(tarefa), AtividadeDiariaService.XP_POR_TAREFA);
    }

    private TarefaDTO dto(Tarefa tarefa) {
        return new TarefaDTO(tarefa.getId(), tarefa.getTitulo(), tarefa.isConcluida(),
                AtividadeDiariaService.XP_POR_TAREFA, tarefa.getDataCriacao(), tarefa.getDataConclusao());
    }
}
