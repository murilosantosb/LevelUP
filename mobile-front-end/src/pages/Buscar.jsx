import { useEffect, useState } from 'react'
import { FlatList, Pressable, RefreshControl, Text, TextInput, View } from 'react-native'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useApiQuery, useSeguir, useSession } from '../hooks/useApi'
import { errorMessage, getData } from '../services/api'
import QueryStatus from '../components/QueryStatus'
import { Avatar, Button, ErrorText } from '../components/ui'
import { colors, styles } from '../styles/theme'

export default function Buscar() {
  const [search, setSearch] = useState('')
  const [term, setTerm] = useState('')
  const { data: user } = useSession()
  const users = useInfiniteQuery({
    queryKey: ['account', user?.id, 'usuarios', term],
    initialPageParam: 0,
    queryFn: ({ pageParam, signal }) => getData('/usuarios', { params: { busca: term, page: pageParam, size: 20 }, signal }),
    getNextPageParam: (lastPage) => lastPage.last ? undefined : lastPage.number + 1,
    enabled: Boolean(user),
  })
  const seguindo = useApiQuery(['seguindo'], `/usuarios/${user?.id}/seguindo`)
  const seguir = useSeguir()

  useEffect(() => {
    const timer = setTimeout(() => setTerm(search.trim()), 300)
    return () => clearTimeout(timer)
  }, [search])

  const results = users.data?.pages.flatMap((page) => page.content) || []

  return (
    <View style={styles.screen}>
      <View style={styles.searchBar}>
        <TextInput accessibilityLabel="Buscar usuários" placeholder="Buscar usuários" placeholderTextColor={colors.muted} style={styles.searchInput} value={search} onChangeText={setSearch} autoCapitalize="none" autoCorrect={false} returnKeyType="search" clearButtonMode="while-editing" />
        <Pressable accessibilityRole="button" onPress={() => setSearch('')}><Text style={styles.muted}>Cancelar</Text></Pressable>
      </View>
      <FlatList
        data={results}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
        refreshControl={<RefreshControl refreshing={users.isRefetching || seguindo.isRefetching} onRefresh={() => { void users.refetch(); void seguindo.refetch() }} tintColor={colors.primary} />}
        ListHeaderComponent={<>
          <QueryStatus query={users} />
          <QueryStatus query={seguindo} />
          <ErrorText>{seguir.isError ? errorMessage(seguir.error) : ''}</ErrorText>
        </>}
        ListEmptyComponent={users.isSuccess ? <Text style={styles.muted}>Nenhum usuário encontrado.</Text> : null}
        ListFooterComponent={users.hasNextPage ? <Button title="Carregar mais" secondary pending={users.isFetchingNextPage} onPress={() => users.fetchNextPage()} /> : null}
        renderItem={({ item }) => {
          const follows = seguindo.data?.some((followed) => followed.id === item.id)
          return <View style={styles.searchItem}>
              <Avatar user={item} />
              <View style={styles.flex}><Text style={styles.username}>{item.username}</Text><Text style={styles.userName}>{item.nome}</Text></View>
            {item.id !== user?.id && <Button title={follows ? 'Seguindo' : 'Seguir'} secondary={follows} disabled={!seguindo.isSuccess || seguir.isPending} onPress={() => seguir.mutate({ id: item.id, seguindo: follows })} />}
          </View>
        }}
      />
    </View>
  )
}
