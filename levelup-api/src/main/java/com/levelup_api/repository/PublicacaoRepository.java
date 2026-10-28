package com.levelup_api.repository;

import com.levelup_api.model.Publicacao;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PublicacaoRepository extends JpaRepository<Publicacao, Long> {
    @EntityGraph(attributePaths = "usuario")
    Page<Publicacao> findAllByOrderByDataCriacaoDescIdDesc(Pageable pageable);
}
