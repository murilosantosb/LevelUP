import { Image, Text, View } from 'react-native'
import { Avatar } from './ui'
import { styles } from '../styles/theme'
import { apiUrl } from '../config/apiUrl'

export default function PostCard({ post }) {
  const fotoUrl = post.fotoUrl ? new URL(post.fotoUrl, `${apiUrl}/`).toString() : null
  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Avatar user={post.autor} />
        <View style={styles.flex}>
          <Text style={styles.username}>{post.autor.username}</Text>
          <Text style={styles.userName}>{post.autor.nome}</Text>
        </View>
        <Text style={styles.userName}>{new Date(post.dataCriacao).toLocaleDateString('pt-BR')}</Text>
      </View>
      {fotoUrl && <Image source={{ uri: fotoUrl }} style={styles.postImage} resizeMode="cover" accessibilityLabel={`Foto publicada por ${post.autor.nome}`} />}
      {post.texto ? <Text style={styles.postCaption}><Text style={styles.username}>{post.autor.username} </Text>{post.texto}</Text> : null}
    </View>
  )
}
