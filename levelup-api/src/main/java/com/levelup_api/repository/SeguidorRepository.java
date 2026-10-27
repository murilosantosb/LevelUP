package com.levelup_api.repository;

import com.levelup_api.model.Seguidor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeguidorRepository extends JpaRepository<Seguidor, Long> {
    boolean existsBySeguidorIdAndSeguidoId(Long seguidorId, Long seguidoId);
    java.util.Optional<Seguidor> findBySeguidorIdAndSeguidoId(Long seguidorId, Long seguidoId);
    java.util.List<Seguidor> findBySeguidoId(Long seguidoId);
    java.util.List<Seguidor> findBySeguidorId(Long seguidorId);
    long countBySeguidoId(Long seguidoId);
    long countBySeguidorId(Long seguidorId);
}
