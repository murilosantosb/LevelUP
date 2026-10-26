import { Outlet } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

export default function AppLayout() {
  return (
    <>
      <main id="conteudo-principal" style={{ paddingBottom: '90px' }}>
        <Outlet />
      </main>
      <BottomNav />
    </>
  )
}