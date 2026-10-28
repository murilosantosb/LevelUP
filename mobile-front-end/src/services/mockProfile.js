import foto1 from '../assets/capainicial.png'

export const profile = {
  username: '@level.up',
  name: 'LevelUp Admin',
  followers: 25,
  days: 176,
  friendsOnline: 14,

  week: [
    { label: 'Dom', day: 18, trained: false },
    { label: 'Seg', day: 19, trained: true },
    { label: 'Ter', day: 20, trained: true },
    { label: 'Qua', day: 21, trained: false },
    { label: 'Qui', day: 22, trained: true },
    { label: 'Sex', day: 23, trained: true },
    { label: 'Sab', day: 24, trained: true },
  ],
  photos: [
    { id: 1, imageUrl: foto1 },
    { id: 2, imageUrl: foto1 },
    { id: 3, imageUrl: foto1 },
  ],
}