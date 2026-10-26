package com.levelup_api.repository;

import com.levelup_api.model.AtividadeDiaria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AtividadeDiariaRepository extends JpaRepository<AtividadeDiaria, Long> {
}
