import { useState } from 'react'
import { users } from '../services/mockUsers'
import './Buscar.css'

export default function Buscar() {
  const [search, setSearch] = useState('')

  const term = search.toLowerCase()
  const results = users.filter(
    (user) =>
      user.username.toLowerCase().includes(term) ||
      user.name.toLowerCase().includes(term)
  )

  return (
    <div id="tela-buscar">
      <div className="barra-busca">
        <input
          id="campo-busca"
          className="campo-busca"
          type="text"
          placeholder="Buscar usuários"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button
          className="botao-cancelar"
          type="button"
          onClick={() => setSearch('')}
        >
          Cancel
        </button>
      </div>

      <ul id="lista-usuarios" className="lista-usuarios">
        {results.map((user) => (
          <li key={user.id} className="item-usuario">
            <div className="avatar-usuario" />
            <div>
              <p className="usuario-post">{user.username}</p>
              <p className="nome-post">{user.name}</p>
            </div>
          </li>
        ))}
      </ul>

      {results.length === 0 && (
        <p className="mensagem-vazia">Nenhum usuário encontrado.</p>
      )}
    </div>
  )
}