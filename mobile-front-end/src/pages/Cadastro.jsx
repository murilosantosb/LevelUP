import { useState } from 'react'
import { useCadastro } from '../hooks/useApi'
import { errorMessage } from '../services/api'
import { AuthLink, AuthScreen, Button, ErrorText, Field } from '../components/ui'
import { styles } from '../styles/theme'

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const cadastro = useCadastro()

  function submit() {
    if (cadastro.isPending) return
    if (nome.trim().length < 3 || nome.trim().length > 100) {
      setError('O nome deve ter entre 3 e 100 caracteres.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Digite um e-mail válido.')
      return
    }
    if (username.trim().length < 3 || username.trim().length > 30) {
      setError('O usuário deve ter entre 3 e 30 caracteres.')
      return
    }
    if (password.length < 6 || password.length > 20) {
      setError('A senha deve ter entre 6 e 20 caracteres.')
      return
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }
    setError('')
    cadastro.mutate({ nome: nome.trim(), email: email.trim(), username: username.trim(), senhaHash: password }, {
      onSuccess: () => navigation.navigate('Login'),
    })
  }

  return (
    <AuthScreen>
      <Field label="Nome completo" placeholder="Nome completo" value={nome} onChangeText={setNome} autoCapitalize="words" autoComplete="name" maxLength={100} />
      <Field label="Email" placeholder="usuario@email.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoComplete="email" />
      <Field label="Nome de usuário" placeholder="@LevelUpUsuario" value={username} onChangeText={setUsername} autoComplete="username-new" maxLength={30} />
      <Field label="Criar senha" placeholder="••••••••" value={password} onChangeText={setPassword} secureTextEntry autoComplete="new-password" maxLength={20} />
      <Field label="Confirmar senha" placeholder="••••••••" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry maxLength={20} onSubmitEditing={submit} returnKeyType="go" />
      <ErrorText>{error || (cadastro.isError ? errorMessage(cadastro.error) : '')}</ErrorText>
      <Button title="Cadastrar" onPress={submit} pending={cadastro.isPending} style={styles.authButton} />
      <AuthLink title="Possuo cadastro >" disabled={cadastro.isPending} onPress={() => navigation.navigate('Login')} />
    </AuthScreen>
  )
}
