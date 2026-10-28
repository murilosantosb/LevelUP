package com.levelup_api.services;

import com.levelup_api.dto.AtividadeDiariaDTO;
import com.levelup_api.dto.AtividadeDiariaRequestDTO;
import com.levelup_api.dto.SequenciaDTO;
import com.levelup_api.model.AtividadeDiaria;
import com.levelup_api.model.Usuario;
import com.levelup_api.repository.AtividadeDiariaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Comparator;
import java.util.List;

@Service
public class AtividadeDiariaService {
    public static final int XP_POR_TAREFA = 10;

    private final AtividadeDiariaRepository repo;
    private final UsuarioService usuarios;
    private final EstatisticaUsuarioService stats;

    public AtividadeDiariaService(
            AtividadeDiariaRepository repo,
            UsuarioService usuarios,
            EstatisticaUsuarioService stats
    ) {
        this.repo = repo;
        this.usuarios = usuarios;
        this.stats = stats;
    }

    @Transactional
    public AtividadeDiariaDTO registrar(String principal, AtividadeDiariaRequestDTO dto) {
        Usuario usuario = usuarios.atualParaAtualizacao(principal);
        LocalDate dia = dto.data() == null ? LocalDate.now(ZoneId.systemDefault()) : dto.data();

        if (dia.isAfter(LocalDate.now(ZoneId.systemDefault()))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Data futura não permitida.");
        }

        int xp;
        try {
            xp = Math.multiplyExact(dto.tarefasConcluidas(), XP_POR_TAREFA);
        } catch (ArithmeticException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantidade de tarefas inválida.");
        }

        AtividadeDiaria atividade = repo.findByUsuarioIdAndData(usuario.getId(), dia).orElse(null);
        int xpAnterior = atividade == null ? 0 : atividade.getXpGanho();

        if (atividade == null) {
            atividade = AtividadeDiaria.builder().usuario(usuario).data(dia).build();
        }

        int xpDoDia = Math.max(xpAnterior, xp);
        atividade.setTarefasConcluidas(dto.tarefasConcluidas());
        atividade.setXpGanho(xpDoDia);

        repo.save(atividade);
        if (xpDoDia > xpAnterior) {
            stats.adicionarXp(usuario.getId(), xpDoDia - xpAnterior);
        }

        return dto(atividade);
    }

    @Transactional(readOnly = true)
    public List<AtividadeDiariaDTO> listar(String principal) {
        return repo.findByUsuarioIdOrderByDataDesc(usuarios.atual(principal).getId()).stream()
                .map(this::dto)
                .toList();
    }

    @Transactional
    public void registrarConclusao(Usuario usuario) {
        LocalDate hoje = LocalDate.now(ZoneId.systemDefault());
        AtividadeDiaria atividade = repo.findByUsuarioIdAndData(usuario.getId(), hoje)
                .orElseGet(() -> AtividadeDiaria.builder().usuario(usuario).data(hoje)
                        .tarefasConcluidas(0).xpGanho(0).build());
        try {
            atividade.setTarefasConcluidas(Math.addExact(atividade.getTarefasConcluidas(), 1));
            atividade.setXpGanho(Math.addExact(atividade.getXpGanho(), XP_POR_TAREFA));
        } catch (ArithmeticException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Limite de atividades do dia atingido.");
        }
        repo.save(atividade);
        stats.adicionarXp(usuario.getId(), XP_POR_TAREFA);
    }

    @Transactional(readOnly = true)
    public List<AtividadeDiariaDTO> periodo(String principal, LocalDate inicio, LocalDate fim) {
        validarPeriodo(inicio, fim);
        return repo.findByUsuarioIdAndDataBetweenOrderByDataAsc(
                        usuarios.atual(principal).getId(), inicio, fim
                ).stream()
                .map(this::dto)
                .toList();
    }

    @Transactional(readOnly = true)
    public AtividadeDiariaDTO porData(String principal, LocalDate data) {
        return repo.findByUsuarioIdAndData(usuarios.atual(principal).getId(), data)
                .map(this::dto)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Atividade não encontrada."
                ));
    }

    @Transactional(readOnly = true)
    public long contar(String principal) {
        return repo.countByUsuarioId(usuarios.atual(principal).getId());
    }

    @Transactional(readOnly = true)
    public SequenciaDTO sequencia(String principal) {
        List<LocalDate> datas = repo.findByUsuarioIdOrderByDataDesc(usuarios.atual(principal).getId()).stream()
                .map(AtividadeDiaria::getData)
                .distinct()
                .sorted(Comparator.reverseOrder())
                .toList();

        LocalDate hoje = LocalDate.now(ZoneId.systemDefault());
        if (datas.isEmpty()
                || (!datas.get(0).equals(hoje) && !datas.get(0).equals(hoje.minusDays(1)))) {
            return new SequenciaDTO(0);
        }

        long dias = 1;
        LocalDate esperado = datas.get(0).minusDays(1);
        for (int i = 1; i < datas.size() && datas.get(i).equals(esperado); i++, esperado = esperado.minusDays(1)) {
            dias++;
        }

        return new SequenciaDTO(dias);
    }

    private void validarPeriodo(LocalDate inicio, LocalDate fim) {
        if (inicio == null
                || fim == null
                || fim.isBefore(inicio)
                || fim.isAfter(LocalDate.now(ZoneId.systemDefault()))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Período inválido.");
        }
    }

    private AtividadeDiariaDTO dto(AtividadeDiaria atividade) {
        return new AtividadeDiariaDTO(
                atividade.getData(),
                atividade.getXpGanho(),
                atividade.getTarefasConcluidas()
        );
    }
}
