import { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { usePublicar } from '../hooks/useApi'
import { errorMessage } from '../services/api'
import { colors, styles } from '../styles/theme'
import { Button, ErrorText, Field } from './ui'

export default function PublicarPost() {
  const [texto, setTexto] = useState('')
  const [fotoUrl, setFotoUrl] = useState('')
  const [erro, setErro] = useState('')
  const publicar = usePublicar()

  function enviar() {
    if (publicar.isPending) return
    setErro('')
    if (!texto.trim() && !fotoUrl.trim()) { setErro('Escreva algo ou informe a URL de uma imagem.'); return }
    if (fotoUrl.trim()) {
      try {
        const url = new URL(fotoUrl.trim())
        if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error()
      } catch { setErro('Informe uma URL de imagem válida com http ou https.'); return }
    }
    publicar.mutate({ texto, fotoUrl }, {
      onSuccess: () => { setTexto(''); setFotoUrl('') },
      onError: (error) => setErro(errorMessage(error)),
    })
  }

  return (
    <View style={[styles.card, { margin: 16 }]}>
      <Text style={styles.heading}>Criar publicação</Text>
      <TextInput accessibilityLabel="Texto da publicação" placeholder="Compartilhe seu dia..." placeholderTextColor={colors.muted} value={texto} onChangeText={setTexto} editable={!publicar.isPending} maxLength={2000} multiline style={styles.postInput} />
      <Field label="URL da imagem (opcional)" placeholder="https://exemplo.com/foto.jpg" value={fotoUrl} onChangeText={setFotoUrl} editable={!publicar.isPending} keyboardType="url" maxLength={2048} />
      <Button title="Publicar" onPress={enviar} pending={publicar.isPending} />
      <ErrorText>{erro}</ErrorText>
    </View>
  )
}
