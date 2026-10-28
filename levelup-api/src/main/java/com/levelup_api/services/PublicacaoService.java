package com.levelup_api.services;

import com.levelup_api.dto.PublicacaoDTO;
import com.levelup_api.dto.PublicacaoRequestDTO;
import com.levelup_api.dto.UsuarioPublicoDTO;
import com.levelup_api.model.Publicacao;
import com.levelup_api.repository.PublicacaoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PublicacaoService {
    private final PublicacaoRepository publicacoes;
    private final UsuarioService usuarios;

    public PublicacaoService(PublicacaoRepository publicacoes, UsuarioService usuarios) {
        this.publicacoes = publicacoes;
        this.usuarios = usuarios;
    }

    @Transactional(readOnly = true)
    public Page<PublicacaoDTO> listar(Pageable pageable) {
        return publicacoes.findAllByOrderByDataCriacaoDescIdDesc(pageable).map(this::dto);
    }

    @Transactional
    public PublicacaoDTO criar(String principal, PublicacaoRequestDTO request) {
        String conteudo = request.texto() == null ? "" : request.texto().trim();
        String fotoUrl = request.fotoUrl() == null || request.fotoUrl().isBlank() ? null : request.fotoUrl().trim();
        if (conteudo.isEmpty() && fotoUrl == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Escreva algo ou escolha uma foto para publicar.");
        }
        if (conteudo.length() > 2000) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O texto deve ter no máximo 2000 caracteres.");
        }
        if (fotoUrl != null) {
            try {
                var uri = java.net.URI.create(fotoUrl);
                if (!("https".equalsIgnoreCase(uri.getScheme()) || "http".equalsIgnoreCase(uri.getScheme()))
                        || uri.getHost() == null || uri.getUserInfo() != null) throw new IllegalArgumentException();
            } catch (IllegalArgumentException exception) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Informe uma URL de imagem válida com http ou https.");
            }
        }
        return dto(publicacoes.save(new Publicacao(usuarios.atual(principal), conteudo, fotoUrl)));
    }

    private PublicacaoDTO dto(Publicacao publicacao) {
        var autor = publicacao.getUsuario();
        return new PublicacaoDTO(publicacao.getId(),
                new UsuarioPublicoDTO(autor.getId(), autor.getNome(), autor.getUsername(), autor.getAvatarUrl()),
                publicacao.getTexto(), publicacao.getFotoUrl(), publicacao.getDataCriacao());
    }
}
