package com.levelup_api.services;

import com.levelup_api.dto.UsuarioPublicoDTO;
import com.levelup_api.model.Seguidor;
import com.levelup_api.repository.SeguidorRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class SeguidorService {
    private final SeguidorRepository repo;
    private final UsuarioService usuarios;

    public SeguidorService(SeguidorRepository repo, UsuarioService usuarios) {
        this.repo = repo;
        this.usuarios = usuarios;
    }

    @Transactional
    public void seguir(String principal, Long alvo) {
        var seguidor = usuarios.atual(principal);
        var seguido = usuarios.buscar(alvo);

        if (seguidor.getId().equals(seguido.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não é permitido seguir a si mesmo.");
        }

        if (repo.existsBySeguidorIdAndSeguidoId(seguidor.getId(), alvo)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Relação de seguimento já existe.");
        }

        try {
            repo.save(Seguidor.builder().seguidor(seguidor).seguido(seguido).build());
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Relação de seguimento já existe.");
        }
    }

    @Transactional
    public void deixarDeSeguir(String principal, Long alvo) {
        var seguidor = usuarios.atual(principal);
        usuarios.buscar(alvo);
        var relacao = repo.findBySeguidorIdAndSeguidoId(seguidor.getId(), alvo)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Relação de seguimento não encontrada."
                ));

        repo.delete(relacao);
    }

    @Transactional(readOnly = true)
    public List<UsuarioPublicoDTO> seguidores(Long id) {
        usuarios.buscar(id);
        return repo.findBySeguidoId(id).stream()
                .map(relacao -> new UsuarioPublicoDTO(
                        relacao.getSeguidor().getId(),
                        relacao.getSeguidor().getNome(),
                        relacao.getSeguidor().getUsername(),
                        relacao.getSeguidor().getAvatarUrl()
                ))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<UsuarioPublicoDTO> seguindo(Long id) {
        usuarios.buscar(id);
        return repo.findBySeguidorId(id).stream()
                .map(relacao -> new UsuarioPublicoDTO(
                        relacao.getSeguido().getId(),
                        relacao.getSeguido().getNome(),
                        relacao.getSeguido().getUsername(),
                        relacao.getSeguido().getAvatarUrl()
                ))
                .toList();
    }

    @Transactional(readOnly = true)
    public long contarSeguidores(Long id) {
        usuarios.buscar(id);
        return repo.countBySeguidoId(id);
    }

    @Transactional(readOnly = true)
    public long contarSeguindo(Long id) {
        usuarios.buscar(id);
        return repo.countBySeguidorId(id);
    }

    @Transactional(readOnly = true)
    public boolean segue(String principal, Long id) {
        var atual = usuarios.atual(principal);
        usuarios.buscar(id);
        return repo.existsBySeguidorIdAndSeguidoId(atual.getId(), id);
    }
}
