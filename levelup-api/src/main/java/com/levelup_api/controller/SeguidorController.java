package com.levelup_api.controller;

import com.levelup_api.dto.UsuarioPublicoDTO;
import com.levelup_api.services.SeguidorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios/{usuarioId}")
public class SeguidorController {
    private final SeguidorService service;

    public SeguidorController(SeguidorService service) {
        this.service = service;
    }

    @PostMapping("/seguir")
    public ResponseEntity<Void> seguir(Authentication auth, @PathVariable Long usuarioId) {
        service.seguir(auth.getName(), usuarioId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/seguir")
    public ResponseEntity<Void> deixar(Authentication auth, @PathVariable Long usuarioId) {
        service.deixarDeSeguir(auth.getName(), usuarioId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/seguidores")
    public List<UsuarioPublicoDTO> seguidores(@PathVariable Long usuarioId) {
        return service.seguidores(usuarioId);
    }

    @GetMapping("/seguindo")
    public List<UsuarioPublicoDTO> seguindo(@PathVariable Long usuarioId) {
        return service.seguindo(usuarioId);
    }

    @GetMapping("/seguidores/contagem")
    public long contarSeguidores(@PathVariable Long usuarioId) {
        return service.contarSeguidores(usuarioId);
    }

    @GetMapping("/seguindo/contagem")
    public long contarSeguindo(@PathVariable Long usuarioId) {
        return service.contarSeguindo(usuarioId);
    }

    @GetMapping("/seguindo/status")
    public boolean segue(Authentication auth, @PathVariable Long usuarioId) {
        return service.segue(auth.getName(), usuarioId);
    }
}
