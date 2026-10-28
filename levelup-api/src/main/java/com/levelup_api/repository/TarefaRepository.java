package com.levelup_api.repository;

import com.levelup_api.model.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
    List<Tarefa> findByUsuarioIdOrderByConcluidaAscDataCriacaoDesc(Long usuarioId);
    Optional<Tarefa> findByIdAndUsuarioId(Long id, Long usuarioId);
}
