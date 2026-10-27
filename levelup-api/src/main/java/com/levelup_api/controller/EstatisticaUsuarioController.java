package com.levelup_api.controller;

import com.levelup_api.dto.EstatisticaUsuarioDTO;
import com.levelup_api.services.EstatisticaUsuarioService;
import com.levelup_api.services.UsuarioService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/estatisticas")
public class EstatisticaUsuarioController {
    private final EstatisticaUsuarioService stats;
    private final UsuarioService usuarios;

    public EstatisticaUsuarioController(EstatisticaUsuarioService stats, UsuarioService usuarios) {
        this.stats = stats;
        this.usuarios = usuarios;
    }

    @GetMapping("/me")
    public EstatisticaUsuarioDTO minhas(Authentication auth) {
        return stats.porUsuario(usuarios.atual(auth.getName()).getId());
    }

    @GetMapping("/usuarios/{usuarioId}")
    public EstatisticaUsuarioDTO usuario(@PathVariable Long usuarioId) {
        return stats.porUsuario(usuarioId);
    }

    @PostMapping("/me/vitorias")
    public EstatisticaUsuarioDTO vitoria(Authentication auth) {
        return stats.registrarVitoria(usuarios.atual(auth.getName()).getId());
    }

    @PostMapping("/me/derrotas")
    public EstatisticaUsuarioDTO derrota(Authentication auth) {
        return stats.registrarDerrota(usuarios.atual(auth.getName()).getId());
    }
}
