package com.levelup_api.controller;

import com.levelup_api.dto.LoginRequestDTO;
import com.levelup_api.dto.LoginResponseDTO;
import com.levelup_api.dto.UsuarioPublicoDTO;
import com.levelup_api.services.TokenAcessoService;
import com.levelup_api.services.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UsuarioService usuarios;
    private final TokenAcessoService tokens;

    public AuthController(UsuarioService usuarios, TokenAcessoService tokens) {
        this.usuarios = usuarios;
        this.tokens = tokens;
    }

    @PostMapping("/login")
    public LoginResponseDTO login(@Valid @RequestBody LoginRequestDTO dto) {
        return tokens.login(dto);
    }

    @GetMapping("/me")
    public UsuarioPublicoDTO me(Authentication authentication) {
        return usuarios.porUsername(authentication.getName());
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(@RequestHeader("Authorization") String authorization) {
        tokens.revogar(authorization.substring(7));
    }
}
