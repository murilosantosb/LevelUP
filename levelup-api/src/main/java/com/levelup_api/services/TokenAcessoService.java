package com.levelup_api.services;

import com.levelup_api.dto.LoginRequestDTO;
import com.levelup_api.dto.LoginResponseDTO;
import com.levelup_api.dto.UsuarioPublicoDTO;
import com.levelup_api.model.TokenAcesso;
import com.levelup_api.repository.TokenAcessoRepository;
import com.levelup_api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.HexFormat;
import java.util.Optional;

@Service
public class TokenAcessoService {
    private final TokenAcessoRepository tokens;
    private final UsuarioRepository usuarios;
    private final PasswordEncoder encoder;
    private final Duration duracao;
    private final String hashInexistente;
    private final SecureRandom random = new SecureRandom();

    public TokenAcessoService(TokenAcessoRepository tokens, UsuarioRepository usuarios,
                              PasswordEncoder encoder, @Value("${app.auth.token-duration:30d}") Duration duracao) {
        this.tokens = tokens;
        this.usuarios = usuarios;
        this.encoder = encoder;
        this.duracao = duracao;
        this.hashInexistente = encoder.encode("conta-inexistente");
    }

    @Transactional
    public LoginResponseDTO login(LoginRequestDTO dto) {
        var usuario = usuarios.findByUsername(dto.username().trim());
        boolean senhaValida = encoder.matches(dto.password(), usuario.map(u -> u.getSenhaHash()).orElse(hashInexistente));
        if (usuario.isEmpty() || !senhaValida) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário ou senha inválidos.");
        }
        var atual = usuario.get();
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
        Instant expiraEm = Instant.now().plus(duracao);
        tokens.save(new TokenAcesso(hash(token), atual, expiraEm));
        return new LoginResponseDTO(token, expiraEm,
                new UsuarioPublicoDTO(atual.getId(), atual.getNome(), atual.getUsername(), atual.getAvatarUrl()));
    }

    @Transactional(readOnly = true)
    public Optional<String> autenticar(String token) {
        if (token == null || token.length() != 43) return Optional.empty();
        return tokens.findById(hash(token))
                .filter(t -> t.getExpiraEm().isAfter(Instant.now()))
                .map(t -> t.getUsuario().getUsername());
    }

    @Transactional
    public void revogar(String token) {
        tokens.deleteById(hash(token));
    }

    private String hash(String token) {
        try {
            return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(token.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException(exception);
        }
    }
}
