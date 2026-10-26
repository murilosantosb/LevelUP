package com.levelup_api.controller;

import com.levelup_api.dto.UsuarioRequestDTO;
import com.levelup_api.dto.UsuarioResponseDTO;
import com.levelup_api.services.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/levelup/api")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> createUser(@RequestBody UsuarioRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.createUser(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> userById(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.userById(id));
    }

    @GetMapping("/{username}")
    public ResponseEntity<UsuarioResponseDTO> userByUsername(@PathVariable String username) {
        return ResponseEntity.ok(usuarioService.userByUsername(username));
    }

    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> listUsers() {
        return ResponseEntity.ok(usuarioService.listUsers());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> updateUser(@PathVariable Long id, @RequestBody UsuarioRequestDTO dto) {
        return ResponseEntity.ok(usuarioService.updateUser(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        usuarioService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}
