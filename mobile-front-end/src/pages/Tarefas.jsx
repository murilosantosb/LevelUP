import { useState } from 'react'
import { FlatList, KeyboardAvoidingView, Platform, RefreshControl, Text, View } from 'react-native'
import { useApiQuery, useRegistrarAtividade, useSession } from '../hooks/useApi'
import { errorMessage } from '../services/api'
import QueryStatus from '../components/QueryStatus'
import { Avatar, Button, ErrorText, Field, Logo } from '../components/ui'
import { colors, styles } from '../styles/theme'
import TarefasPanel from '../components/TarefasPanel'
import { useQueryClient } from '@tanstack/react-query'

export default function Tarefas() {
  const client = useQueryClient()
  const { data: user } = useSession()
  const atividades = useApiQuery(['atividades'], '/atividades-diarias/me')
  const registrar = useRegistrarAtividade()
  const [tarefas, setTarefas] = useState('1')
  const [error, setError] = useState('')

  function submit() {
    if (registrar.isPending) return
    const quantidade = Number(tarefas)
    if (!tarefas.trim() || !Number.isInteger(quantidade) || quantidade < 0 || quantidade > 214748364) {
      setError('Informe uma quantidade inteira entre 0 e 214748364.')
      return
    }
    setError('')
    registrar.mutate({ tarefasConcluidas: quantidade })
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={100}>
      <FlatList
        data={atividades.data || []}
        keyExtractor={(item) => item.data}
        contentContainerStyle={{ paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
        refreshControl={<RefreshControl refreshing={atividades.isRefetching} onRefresh={() => client.invalidateQueries({ queryKey: ['account'] })} tintColor={colors.primary} />}
        ListHeaderComponent={<View style={{ gap: 20 }}>
          <View style={styles.feedHeader}>
            <Logo style={styles.feedLogo} />
            <View style={styles.row}>
              <Avatar user={user} />
              <View><Text style={styles.username}>{user?.username}</Text><Text style={styles.userName}>{user?.nome}</Text></View>
            </View>
          </View>
          <TarefasPanel />
          <View style={[styles.card, { marginHorizontal: 16 }]}>
            <Text style={styles.heading}>Minha atividade</Text>
            <Field label="Total de tarefas concluídas hoje" value={tarefas} onChangeText={setTarefas} keyboardType="number-pad" maxLength={9} />
            <Text style={styles.muted}>Informe o total do dia. Salvar novamente atualiza a atividade de hoje.</Text>
            <ErrorText>{error || (registrar.isError ? errorMessage(registrar.error) : '')}</ErrorText>
            {registrar.isSuccess && <Text accessibilityLiveRegion="polite" style={styles.text}>Atividade salva!</Text>}
            <Button title="Registrar atividade" onPress={submit} pending={registrar.isPending} />
          </View>
          <Text style={[styles.heading, { paddingHorizontal: 16 }]}>Histórico de atividades</Text>
          <QueryStatus query={atividades} />
        </View>}
        ListEmptyComponent={atividades.isSuccess ? <Text style={styles.muted}>Nenhuma atividade registrada ainda.</Text> : null}
        renderItem={({ item }) => <View style={[styles.listItem, { paddingHorizontal: 16 }]}>
          <Text style={styles.text}>{new Date(`${item.data}T12:00:00`).toLocaleDateString('pt-BR')}</Text>
          <Text style={styles.muted}>{item.tarefasConcluidas} tarefas · {item.xpGanho} XP</Text>
        </View>}
      />
    </KeyboardAvoidingView>
  )
}
