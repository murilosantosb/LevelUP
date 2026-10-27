import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import './Cadastro.css'
import background from '../assets/capainicial.png'

export default function Cadastro() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const usernameAvailable = username.length >= 3 && username !== 'level.up'

  function handleSubmit(event) {
    event.preventDefault()

    if (!fullName || !email || !username || !password || !confirmPassword) {
      setError('Preencha todos os campos.')
      return
    }

    if (!email.includes('@')) {
      setError('Digite um e-mail válido.')
      return
    }

    if (!usernameAvailable) {
      setError('Escolha outro nome de usuário.')
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    setError('')
    //Aqui irá o post de usuários na etapa da API
    navigate('/login')
  }

  return (
    <div
      className="tela-autenticacao"
      id="tela-login"
      style={{ backgroundImage: `url(${background})` }}
      >
      <form
        className="cartao-autenticacao cartao-cadastro"
        onSubmit={handleSubmit}
      >
        <img className="logo-autenticacao" src={logo} alt="Logo LevelUp" />

        <div className="grupo-campo">
          <label htmlFor="campo-nome">Nome completo</label>
          <input
            id="campo-nome"
            className="campo-texto"
            type="text"
            placeholder="Usuário Silva Santos"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </div>

        <div className="grupo-campo">
          <label htmlFor="campo-email">Email</label>
          <input
            id="campo-email"
            className="campo-texto"
            type="email"
            placeholder="usuario@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="grupo-campo">
          <label htmlFor="campo-usuario">Nome de usuário</label>
          <div className="linha-usuario">
            <input
              id="campo-usuario"
              className="campo-texto"
              type="text"
              placeholder="@LevelUpUsuario"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            {username && (
              <span
                className={
                  usernameAvailable
                    ? 'status-usuario disponivel'
                    : 'status-usuario indisponivel'
                }
              >
                {usernameAvailable ? 'disponível' : 'indisponível'}
              </span>
            )}
          </div>
        </div>

        <div className="grupo-campo">
          <label htmlFor="campo-senha">Criar senha</label>
          <input
            id="campo-senha"
            className="campo-texto"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="grupo-campo">
          <label htmlFor="campo-confirmar-senha">Confirmar senha</label>
          <input
            id="campo-confirmar-senha"
            className="campo-texto"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>

        {error && <p className="mensagem-erro">{error}</p>}

        <button className="botao-principal" type="submit">
          Cadastrar
        </button>

        <Link className="link-secundario" to="/login">
          Possuo cadastro &gt;
        </Link>
      </form>
    </div>
  )
}