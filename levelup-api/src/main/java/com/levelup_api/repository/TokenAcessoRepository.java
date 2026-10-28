package com.levelup_api.repository;

import com.levelup_api.model.TokenAcesso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenAcessoRepository extends JpaRepository<TokenAcesso, String> {
    void deleteByUsuarioId(Long usuarioId);
}
