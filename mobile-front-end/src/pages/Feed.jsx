import logoLevelUp from '../assets/logo.svg'
import { currentUser, posts } from '../services/mockPosts' // import { useState, useEffect } from 'react'
import PostCard from '../components/PostCard'
import './Feed.css'

export default function Feed() {
  return (
    <div id="tela-feed">
      <header className="cabecalho-feed">
        <img className="logo-feed" src={logoLevelUp} alt="LevelUp" />

        <div className="usuario-feed">
          <div className="avatar-feed" />
          <div>
            <p className="usuario-post">{currentUser.username}</p>
            <p className="nome-post">{currentUser.name}</p>
          </div>
        </div>
      </header>

      <section id="lista-posts">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  )
}


/* 
PARA A API

import { useState, useEffect } from 'react'
import logoLevelUp from '../assets/logo.svg'
import { buscarPosts } from '../services/postService'
import PostCard from '../components/PostCard'
import './Feed.css'

export default function Feed() {
  const [currentUser, setCurrentUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregarFeed() {
      try {
        const dados = await buscarPosts()

        setPosts(dados.posts)
        setCurrentUser(dados.currentUser)
      } catch (erro) {
        setErro('Não foi possível carregar o feed.')
      } finally {
        setCarregando(false)
      }
    }

    carregarFeed()
  }, [])

  if (carregando) {
    return <p>Carregando feed...</p>
  }

  if (erro) {
    return <p>{erro}</p>
  }

  return (
    <div id="tela-feed">
      <header className="cabecalho-feed">
        <img className="logo-feed" src={logoLevelUp} alt="LevelUp" />

        {currentUser && (
          <div className="usuario-feed">
            <div className="avatar-feed" />
            <div>
              <p className="usuario-post">{currentUser.username}</p>
              <p className="nome-post">{currentUser.name}</p>
            </div>
          </div>
        )}
      </header>

      <section id="lista-posts">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  )
}
 */