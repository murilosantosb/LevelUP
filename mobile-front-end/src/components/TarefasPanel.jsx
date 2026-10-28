import { useState } from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import { useApiQuery, useConcluirTarefa, useCriarTarefa } from '../hooks/useApi'
import { errorMessage } from '../services/api'
import { colors, styles } from '../styles/theme'
import { Button, ErrorText, Field } from './ui'
import QueryStatus from './QueryStatus'

export default function TarefasPanel() {
  const tarefas = useApiQuery(['tarefas'], '/tarefas/me')
  const stats = useApiQuery(['estatisticas'], '/estatisticas/me')
  const criar = useCriarTarefa()
  const concluir = useConcluirTarefa()
  const [titulo, setTitulo] = useState('')
  const [erro, setErro] = useState('')
  const [mensagem, setMensagem] = useState('')

  function adicionar() {
    if (criar.isPending) return
    setErro('')
    setMensagem('')
    if (!titulo.trim()) { setErro('Escreva o nome da tarefa.'); return }
    criar.mutate(titulo.trim(), {
      onSuccess: () => setTitulo(''),
      onError: (error) => setErro(errorMessage(error)),
    })
  }

  function completar(tarefa) {
    if (concluir.isPending || tarefa.concluida) return
    setErro('')
    setMensagem('')
    concluir.mutate(tarefa.id, {
      onSuccess: (data) => setMensagem(data.xpRecebido > 0 ? `Tarefa concluída! +${data.xpRecebido} XP` : 'Essa tarefa já foi concluída.'),
      onError: (error) => setErro(errorMessage(error)),
    })
  }

  return (
    <View style={[styles.card, { marginHorizontal: 16 }]}>
      <View style={styles.spread}>
        <Text style={styles.heading}>Minhas tarefas</Text>
        {stats.data && <Text style={styles.xpBadge}>{stats.data.xpTotal} XP · Nível {stats.data.nivel}</Text>}
      </View>
      <Text style={styles.muted}>Conclua uma tarefa e ganhe 10 XP.</Text>
      <Field label="Nova tarefa" placeholder="O que você quer fazer?" value={titulo} onChangeText={setTitulo} maxLength={150} autoCapitalize="sentences" onSubmitEditing={adicionar} returnKeyType="done" />
      <Button title="Adicionar tarefa" onPress={adicionar} pending={criar.isPending} />
      <ErrorText>{erro}</ErrorText>
      {mensagem ? <Text accessibilityLiveRegion="polite" style={styles.xpBadge}>{mensagem}</Text> : null}
      <QueryStatus query={tarefas} />
      <QueryStatus query={stats} />
      {tarefas.isSuccess && tarefas.data.length === 0 && <Text style={styles.muted}>Suas tarefas vão aparecer aqui.</Text>}
      {tarefas.data?.map((tarefa) => (
        <Pressable key={tarefa.id} accessibilityRole="checkbox" accessibilityLabel={`Concluir tarefa: ${tarefa.titulo}`} accessibilityState={{ checked: tarefa.concluida, disabled: tarefa.concluida || concluir.isPending }} disabled={tarefa.concluida || concluir.isPending} onPress={() => completar(tarefa)} style={styles.taskRow}>
          {concluir.isPending && concluir.variables === tarefa.id ? <ActivityIndicator color={colors.primary} /> : <Feather name={tarefa.concluida ? 'check-square' : 'square'} size={22} color={tarefa.concluida ? colors.primary : colors.muted} />}
          <Text style={[styles.text, styles.flex, tarefa.concluida && styles.taskDone]}>{tarefa.titulo}</Text>
          <Text style={tarefa.concluida ? styles.muted : styles.xpBadge}>{tarefa.concluida ? 'Concluída' : `+${tarefa.xpRecompensa} XP`}</Text>
        </Pressable>
      ))}
    </View>
  )
}
