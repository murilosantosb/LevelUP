import { Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Feed from './pages/Feed'
import Buscar from './pages/Buscar'
import Perfil from './pages/Perfil'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      <Route element={<AppLayout />}>
        <Route path="/" element={<Feed />} />
        <Route path="/buscar" element={<Buscar />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>
    </Routes>
  )
}