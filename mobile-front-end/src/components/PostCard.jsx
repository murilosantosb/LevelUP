import { useState } from 'react'
import { FiHeart } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import './PostCard.css'

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(post.liked)
  const [likes, setLikes] = useState(post.likes)

  function handleLike() {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  return (
    <article className="cartao-post">
      <header className="cabecalho-post">
        <div className="avatar-post" />
        <div>
          <p className="usuario-post">{post.author.username}</p>
          <p className="nome-post">{post.author.name}</p>
        </div>
      </header>

      <img className="imagem-post" src={post.imageUrl} alt={post.caption} />

      <div className="acoes-post">
        <button
          className="botao-curtir"
          type="button"
          onClick={handleLike}
          aria-label="Curtir"
        >
          {liked ? <FaHeart size={24} color="var(--primary)" /> : <FiHeart size={24} />}
        </button>
        <span className="contador-curtidas">{likes}</span>
      </div>

      <p className="legenda-post">
        <strong>{post.author.username}</strong> {post.caption}
      </p>
    </article>
  )
}