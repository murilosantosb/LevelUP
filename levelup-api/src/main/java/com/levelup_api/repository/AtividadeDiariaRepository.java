package com.levelup_api.repository;

import com.levelup_api.model.AtividadeDiaria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AtividadeDiariaRepository extends JpaRepository<AtividadeDiaria, Long> {
    java.util.Optional<AtividadeDiaria> findByUsuarioIdAndData(Long usuarioId, java.time.LocalDate data);
    java.util.List<AtividadeDiaria> findByUsuarioIdOrderByDataDesc(Long usuarioId);
    java.util.List<AtividadeDiaria> findByUsuarioIdAndDataBetweenOrderByDataAsc(Long usuarioId, java.time.LocalDate inicio, java.time.LocalDate fim);
    long countByUsuarioId(Long usuarioId);
}
