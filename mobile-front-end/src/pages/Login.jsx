import './LoginCadastro.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    if (!username || !password) {
      setError('Preencha todos os campos.')
      return
    }

    setError('')
    //Apenas navega enquanto não está conectada à api
    navigate('/')
  }

  return (
    <div className="tela-autenticacao" id="tela-login">
      <form className="cartao-autenticacao" onSubmit={handleSubmit}>
        <img className="logo-autenticacao" src={logo} alt="Logo LevelUp" />

        <div className="grupo-campo">
          <label htmlFor="campo-usuario">Usuário</label>
          <input
            id="campo-usuario"
            className="campo-texto"
            type="text"
            placeholder="@LevelUpUsuario"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="grupo-campo">
          <label htmlFor="campo-senha">Senha</label>
          <input
            id="campo-senha"
            className="campo-texto"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {error && <p className="mensagem-erro">{error}</p>}

        <button className="botao-principal" type="submit">
          Entrar
        </button>

        <Link className="link-secundario" to="/cadastro">
          Criar conta &gt;
        </Link>
      </form>
    </div>
  )
}