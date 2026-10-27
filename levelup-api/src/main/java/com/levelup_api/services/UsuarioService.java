package com.levelup_api.services;

import com.levelup_api.dto.*;
import com.levelup_api.model.Usuario;
import com.levelup_api.repository.UsuarioRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.Locale;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarios;
    private final PasswordEncoder encoder;
    private final EstatisticaUsuarioService estatisticas;
    public UsuarioService(UsuarioRepository usuarios, PasswordEncoder encoder, EstatisticaUsuarioService estatisticas) {
        this.usuarios = usuarios; this.encoder = encoder; this.estatisticas = estatisticas;
    }
    @Transactional(readOnly = true) public Page<UsuarioPublicoDTO> listar(Pageable pageable) {
        return usuarios.findAll(pageable).map(this::publico);
    }
    @Transactional public UsuarioResponseDTO cadastrar(UsuarioRequestDTO dto) {
        String email = dto.email().trim().toLowerCase(Locale.ROOT), username = dto.username().trim();
        if (usuarios.existsByEmail(email)) throw new ResponseStatusException(HttpStatus.CONFLICT, "E-mail já cadastrado.");
        if (usuarios.existsByUsername(username)) throw new ResponseStatusException(HttpStatus.CONFLICT, "Username já cadastrado.");
        Usuario u = usuarios.save(Usuario.builder().nome(dto.nome().trim()).username(username).email(email)
                .avatarUrl(dto.avatarUrl()).senhaHash(encoder.encode(dto.senhaHash())).build());
        estatisticas.criarIniciais(u);
        return resposta(u);
    }
    @Transactional(readOnly = true) public UsuarioPublicoDTO porId(Long id) { return publico(buscar(id)); }
    @Transactional(readOnly = true) public UsuarioPublicoDTO porUsername(String username) {
        return publico(usuarios.findByUsername(username).orElseThrow(() -> naoEncontrado("Usuário não encontrado.")));
    }
    @Transactional public UsuarioResponseDTO atualizar(String principal, UsuarioAtualizacaoDTO dto) {
        Usuario u = atual(principal); String username = dto.username().trim();
        String email = dto.email().trim().toLowerCase(Locale.ROOT);
        if (usuarios.existsByEmailAndIdNot(email, u.getId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "E-mail já cadastrado.");
        }
        if (usuarios.existsByUsernameAndIdNot(username, u.getId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username já cadastrado.");
        }
        u.setNome(dto.nome().trim()); u.setUsername(username); u.setEmail(email); u.setAvatarUrl(dto.avatarUrl());
        return resposta(usuarios.save(u));
    }
    @Transactional public void excluir(String principal) { usuarios.delete(atual(principal)); }
    @Transactional(readOnly = true) public Usuario atual(String principal) {
        return usuarios.findByUsername(principal).orElseThrow(() -> naoEncontrado("Usuário autenticado não vinculado a uma conta."));
    }
    @Transactional(readOnly = true)
    public Usuario buscar(Long id) {
        return usuarios.findById(id).orElseThrow(() -> naoEncontrado("Usuário não encontrado."));
    }

    private UsuarioPublicoDTO publico(Usuario u) {
        return new UsuarioPublicoDTO(u.getId(), u.getNome(), u.getUsername(), u.getAvatarUrl());
    }

    private UsuarioResponseDTO resposta(Usuario u) {
        return UsuarioResponseDTO.builder()
                .id(u.getId())
                .nome(u.getNome())
                .username(u.getUsername())
                .email(u.getEmail())
                .avatarUrl(u.getAvatarUrl())
                .dataCriacao(u.getDataCriacao())
                .build();
    }

    private ResponseStatusException naoEncontrado(String msg) {
        return new ResponseStatusException(HttpStatus.NOT_FOUND, msg);
    }
}
