import post1 from '../assets/capainicial.png'
import post2 from '../assets/capainicial.png'
export const currentUser = {
  username: '@level.up',
  name: 'LevelUp Admin',
}

export const posts = [
  {
    id: 1,
    author: { username: '@level.up.user', name: 'LevelUp Usuário' },
    imageUrl: post1,
    caption: 'Mais um dia de treino!',
    likes: 12,
    liked: false,
  },
  {
    id: 2,
    author: { username: '@level.up', name: 'LevelUp Admin' },
    imageUrl: post2,
    caption: 'Foco total hoje.',
    likes: 5,
    liked: true,
  },
]