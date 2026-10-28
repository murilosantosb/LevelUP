package com.levelup_api.controller;

import com.levelup_api.dto.UsuarioAtualizacaoDTO;
import com.levelup_api.dto.UsuarioPublicoDTO;
import com.levelup_api.dto.UsuarioRequestDTO;
import com.levelup_api.dto.UsuarioResponseDTO;
import com.levelup_api.services.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> cadastrar(@Valid @RequestBody UsuarioRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.cadastrar(dto));
    }

    @GetMapping("/{id:[0-9]+}")
    public UsuarioPublicoDTO porId(@PathVariable Long id) {
        return service.porId(id);
    }

    @GetMapping("/username/{username}")
    public UsuarioPublicoDTO porUsername(@PathVariable String username) {
        return service.porUsername(username);
    }

    @GetMapping
    public Page<UsuarioPublicoDTO> listar(@RequestParam(defaultValue = "") String busca,
                                         @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        return service.pesquisar(busca, pageable);
    }

    @PutMapping("/me")
    public UsuarioResponseDTO atualizar(Authentication auth, @Valid @RequestBody UsuarioAtualizacaoDTO dto) {
        return service.atualizar(auth.getName(), dto);
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> excluir(Authentication auth) {
        service.excluir(auth.getName());
        return ResponseEntity.noContent().build();
    }
}
