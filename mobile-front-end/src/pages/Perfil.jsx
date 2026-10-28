import { Image, RefreshControl, ScrollView, Text, View } from 'react-native'
import { useApiQuery, useLogout, useSession } from '../hooks/useApi'
import { errorMessage } from '../services/api'
import QueryStatus from '../components/QueryStatus'
import { Avatar, Button, ErrorText } from '../components/ui'
import { colors, styles } from '../styles/theme'

export default function Perfil() {
  const { data: user } = useSession()
  const logout = useLogout()
  const atividades = useApiQuery(['atividades'], '/atividades-diarias/me')
  const seguidores = useApiQuery(['seguidores', user?.id], `/usuarios/${user?.id}/seguidores/contagem`)
  const seguindo = useApiQuery(['seguindo'], `/usuarios/${user?.id}/seguindo`)
  const stats = useApiQuery(['estatisticas'], '/estatisticas/me')
  const sequencia = useApiQuery(['sequencia'], '/atividades-diarias/me/sequencia')
  const queries = [atividades, seguidores, seguindo, stats, sequencia]
  const today = new Date()
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay())
  const week = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    return { key, label: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][index], day: date.getDate(), trained: atividades.data?.some((item) => item.data === key) }
  })

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24, gap: 16 }} refreshControl={<RefreshControl refreshing={queries.some((query) => query.isRefetching)} onRefresh={() => queries.forEach((query) => { void query.refetch() })} tintColor={colors.primary} />}>
      <View style={styles.profileTop}>
        <Avatar user={user} large />
        <Text style={styles.profileName}>{user?.nome}</Text>
        <Text style={styles.userName}>{user?.username}</Text>
        <View style={styles.profileStats}>
          <View style={styles.center}><Text style={styles.profileStatValue}>{seguidores.data ?? '—'}</Text><Text style={styles.userName}>Seguidores</Text></View>
          <View style={styles.statDivider} />
          <View style={styles.center}><Text style={styles.profileStatValue}>{atividades.data?.length ?? '—'}</Text><Text style={styles.userName}>Dias</Text></View>
        </View>
        <View style={{ marginTop: 20 }}><Button title="Sair da conta" secondary pending={logout.isPending} onPress={() => logout.mutate()} /></View>
        <ErrorText>{logout.isError ? errorMessage(logout.error) : ''}</ErrorText>
      </View>
      {queries.map((query, index) => <QueryStatus key={index} query={query} />)}
      <View style={styles.week}>
        {week.map((day) => <View key={day.key} style={styles.day} accessibilityLabel={`${day.label}, ${day.day}${day.trained ? ', atividade registrada' : ''}`}>
          <View style={[styles.dot, day.trained && styles.activeDot]} />
          <Text style={styles.userName}>{day.label}</Text><Text style={styles.text}>{day.day}</Text>
        </View>)}
      </View>
      <View style={styles.row}>
        <View style={styles.friendsCard}><Text style={styles.text}>Seguindo</Text><Text style={[styles.muted, { color: colors.primary }]}>{seguindo.data?.length ?? '—'} pessoas</Text></View>
        <Image source={require('../assets/motPerfil.png')} style={styles.incentive} resizeMode="cover" accessibilityLabel="Continue! Você está evoluindo." />
      </View>
      <View style={styles.card}>
        <Text style={styles.heading}>Minha evolução</Text>
        {stats.data && <>
          <Text style={styles.statValue}>Nível {stats.data.nivel}</Text>
          <Text style={styles.text}>{stats.data.xpTotal} XP · {stats.data.vitorias} vitórias · {stats.data.derrotas} derrotas</Text>
        </>}
        {sequencia.data && <Text style={styles.muted}>{sequencia.data.diasConsecutivos} dias consecutivos de atividade</Text>}
      </View>
    </ScrollView>
  )
}
