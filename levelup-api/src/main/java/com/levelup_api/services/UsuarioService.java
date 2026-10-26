package com.levelup_api.services;

import com.levelup_api.dto.UsuarioRequestDTO;
import com.levelup_api.dto.UsuarioResponseDTO;
import com.levelup_api.model.Usuario;
import com.levelup_api.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UsuarioResponseDTO> listUsers() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public UsuarioResponseDTO createUser(UsuarioRequestDTO dto) {

        Usuario user = Usuario.builder()
                .nome(dto.nome())
                .username(dto.email())
                .email(dto.email())
                .avatarUrl(dto.avatarUrl())
                .senhaHash(passwordEncoder.encode(dto.senhaHash()))
                .build();

        usuarioRepository.save(user);

        return toResponse(user);
    }

    public UsuarioResponseDTO userById(Long id) {
        Usuario user = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não foi encontrado!"));

        return toResponse(user);
    }

    public UsuarioResponseDTO userByUsername(String username) {
        Usuario user = usuarioRepository.findByUsername(username);

        if (usuarioRepository.findByUsername(username).equals(user)) {
            return toResponse(user);
        } else {
            throw new RuntimeException("Usuário não foi encontrado");
        }
    }

    public UsuarioResponseDTO updateUser(Long id, UsuarioRequestDTO user) {
       Usuario newUser  = usuarioRepository.findById(id)
                       .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

       newUser.setNome(user.nome());
       newUser.setUsername(user.username());
       newUser.setAvatarUrl(user.avatarUrl());

       usuarioRepository.save(newUser);

       return toResponse(newUser);
    }

    public void deleteUser(Long id) {
        usuarioRepository.deleteById(id);
    }

    public UsuarioResponseDTO toResponse(Usuario user) {
        return UsuarioResponseDTO.builder()
                .id(user.getId())
                .nome(user.getNome())
                .username(user.getUsername())
                .email(user.getEmail())
                .avatarUrl(user.getAvatarUrl())
                .dataCriacao(user.getDataCriacao())
                .build();
    }
}
