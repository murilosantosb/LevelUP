package com.levelup_api.repository;

import com.levelup_api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    @org.springframework.data.jpa.repository.Lock(jakarta.persistence.LockModeType.PESSIMISTIC_WRITE)
    @org.springframework.data.jpa.repository.Query("select u from Usuario u where u.username = :username")
    Optional<Usuario> findByUsernameForUpdate(@org.springframework.data.repository.query.Param("username") String username);

    org.springframework.data.domain.Page<Usuario> findByNomeContainingIgnoreCaseOrUsernameContainingIgnoreCase(
            String nome, String username, org.springframework.data.domain.Pageable pageable);

    Optional<Usuario> findByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmailAndIdNot(String email, Long id);

    boolean existsByUsernameAndIdNot(String username, Long id);
}
