package com.levelup_api.repository;

import com.levelup_api.model.EstatisticaUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstatisticaUsuarioRepository extends JpaRepository<EstatisticaUsuario, Long> {
}
