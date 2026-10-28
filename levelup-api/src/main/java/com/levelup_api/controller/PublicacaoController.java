package com.levelup_api.controller;

import com.levelup_api.dto.PublicacaoDTO;
import com.levelup_api.dto.PublicacaoRequestDTO;
import jakarta.validation.Valid;
import com.levelup_api.services.PublicacaoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
public class PublicacaoController {
    private final PublicacaoService publicacoes;

    public PublicacaoController(PublicacaoService publicacoes) {
        this.publicacoes = publicacoes;
    }

    @GetMapping
    public Page<PublicacaoDTO> listar(@PageableDefault(size = 10) Pageable pageable) {
        return publicacoes.listar(pageable);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PublicacaoDTO criar(Authentication auth, @Valid @RequestBody PublicacaoRequestDTO request) {
        return publicacoes.criar(auth.getName(), request);
    }
}
