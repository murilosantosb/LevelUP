import { useState } from 'react'
import { useLogin } from '../hooks/useApi'
import { errorMessage } from '../services/api'
import { AuthLink, AuthScreen, Button, ErrorText, Field } from '../components/ui'
import { styles } from '../styles/theme'

export default function Login({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const login = useLogin()

  function submit() {
    if (login.isPending) return
    if (!username.trim() || !password) {
      setError('Preencha o usuário e a senha.')
      return
    }
    setError('')
    login.mutate({ username, password })
  }

  return (
    <AuthScreen>
      <Field label="Usuário" value={username} onChangeText={setUsername} placeholder="@LevelUpUsuario" textContentType="username" autoComplete="username" maxLength={30} />
      <Field label="Senha" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry textContentType="password" autoComplete="current-password" onSubmitEditing={submit} returnKeyType="go" />
      <ErrorText>{error || (login.isError ? errorMessage(login.error) : '')}</ErrorText>
      <Button title="Entrar" pending={login.isPending} onPress={submit} style={styles.authButton} />
      <AuthLink title="Criar conta >" disabled={login.isPending} onPress={() => navigation.navigate('Cadastro')} />
    </AuthScreen>
  )
}
