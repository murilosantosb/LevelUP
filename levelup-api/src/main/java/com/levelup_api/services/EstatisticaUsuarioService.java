package com.levelup_api.services;

import com.levelup_api.dto.EstatisticaUsuarioDTO;
import com.levelup_api.model.EstatisticaUsuario;
import com.levelup_api.model.Usuario;
import com.levelup_api.repository.EstatisticaUsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class EstatisticaUsuarioService {
    private static final long XP_POR_NIVEL = 100L;

    private final EstatisticaUsuarioRepository repo;

    public EstatisticaUsuarioService(EstatisticaUsuarioRepository repo) {
        this.repo = repo;
    }

    @Transactional
    public EstatisticaUsuario criarIniciais(Usuario usuario) {
        if (repo.findByUsuarioId(usuario.getId()).isPresent()) {
            return repo.findByUsuarioId(usuario.getId()).orElseThrow();
        }

        return repo.save(EstatisticaUsuario.builder()
                .usuario(usuario)
                .xpTotal(0L)
                .nivel(1)
                .vitorias(0)
                .derrotas(0)
                .build());
    }

    @Transactional(readOnly = true)
    public EstatisticaUsuarioDTO porUsuario(Long usuarioId) {
        return dto(buscar(usuarioId));
    }

    @Transactional
    public EstatisticaUsuarioDTO adicionarXp(Long usuarioId, long xp) {
        if (xp <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "XP deve ser positivo.");
        }

        EstatisticaUsuario e = buscar(usuarioId);
        try {
            e.setXpTotal(Math.addExact(e.getXpTotal(), xp));
        } catch (ArithmeticException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "XP excede o limite permitido.");
        }

        atualizarNivel(e);
        return dto(repo.save(e));
    }

    @Transactional
    public EstatisticaUsuarioDTO registrarVitoria(Long usuarioId) {
        EstatisticaUsuario e = buscar(usuarioId);
        e.setVitorias(Math.addExact(e.getVitorias(), 1));
        return dto(repo.save(e));
    }

    @Transactional
    public EstatisticaUsuarioDTO registrarDerrota(Long usuarioId) {
        EstatisticaUsuario e = buscar(usuarioId);
        e.setDerrotas(Math.addExact(e.getDerrotas(), 1));
        return dto(repo.save(e));
    }

    private void atualizarNivel(EstatisticaUsuario e) {
        e.setNivel(Math.toIntExact(e.getXpTotal() / XP_POR_NIVEL + 1));
    }

    private EstatisticaUsuario buscar(Long usuarioId) {
        return repo.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Estatísticas não encontradas."
                ));
    }

    private EstatisticaUsuarioDTO dto(EstatisticaUsuario e) {
        int total = e.getVitorias() + e.getDerrotas();
        double taxa = total == 0 ? 0.0 : e.getVitorias() * 100.0 / total;
        return new EstatisticaUsuarioDTO(
                e.getUsuario().getId(),
                e.getXpTotal(),
                e.getNivel(),
                e.getVitorias(),
                e.getDerrotas(),
                taxa
        );
    }
}
