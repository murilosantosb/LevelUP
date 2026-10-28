import { FlatList, KeyboardAvoidingView, Platform, RefreshControl, Text, View } from 'react-native'
import { usePosts, useSession } from '../hooks/useApi'
import QueryStatus from '../components/QueryStatus'
import { Avatar, Button, Logo } from '../components/ui'
import PostCard from '../components/PostCard'
import PublicarPost from '../components/PublicarPost'
import { colors, styles } from '../styles/theme'

export default function Feed() {
  const { data: user } = useSession()
  const posts = usePosts()
  const items = posts.data?.pages.flatMap((page) => page.content) || []

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={100}>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
        refreshControl={<RefreshControl refreshing={posts.isRefetching} onRefresh={() => posts.refetch()} tintColor={colors.primary} />}
        ListHeaderComponent={<>
          <View style={styles.feedHeader}>
            <Logo style={styles.feedLogo} />
            <View style={styles.row}>
              <Avatar user={user} />
              <View><Text style={styles.username}>{user?.username}</Text><Text style={styles.userName}>{user?.nome}</Text></View>
            </View>
          </View>
          <PublicarPost />
          <QueryStatus query={posts} />
        </>}
        ListEmptyComponent={posts.isSuccess ? <Text style={[styles.muted, { padding: 16 }]}>Nenhuma publicação ainda. Compartilhe a primeira!</Text> : null}
        ListFooterComponent={posts.hasNextPage ? <View style={{ margin: 16 }}><Button title="Carregar mais" secondary pending={posts.isFetchingNextPage} onPress={() => posts.fetchNextPage()} /></View> : null}
        renderItem={({ item }) => <PostCard post={item} />}
      />
    </KeyboardAvoidingView>
  )
}
