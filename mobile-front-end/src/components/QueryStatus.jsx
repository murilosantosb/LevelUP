import { ActivityIndicator, Text, View } from 'react-native'
import { errorMessage } from '../services/api'
import { colors, styles } from '../styles/theme'
import { Button, ErrorText } from './ui'

export default function QueryStatus({ query }) {
  if (query.isPending) return <View style={styles.status}><ActivityIndicator color={colors.primary} /><Text style={styles.muted}>Carregando...</Text></View>
  if (query.isError) return <View style={styles.status}><ErrorText>{errorMessage(query.error)}</ErrorText><Button title="Tentar novamente" secondary onPress={() => query.refetch()} /></View>
  return null
}
