package com.levelup_api.services;

import com.levelup_api.model.EstatisticaUsuario;
import com.levelup_api.repository.EstatisticaUsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class EstatisticaUsuarioService {

    private final EstatisticaUsuarioRepository estatisticaUsuarioRepository;

    public EstatisticaUsuarioService(EstatisticaUsuarioRepository estatisticaUsuarioRepository) {
        this.estatisticaUsuarioRepository = estatisticaUsuarioRepository;
    }

    public EstatisticaUsuario searchUserStatisticsById() {

    }
}
 