import { NavLink } from 'react-router-dom'
import { FiHome, FiSearch, FiUser } from 'react-icons/fi'

const itens = [
  { to: '/', label: 'Home', icone: <FiHome size={26} /> },
  { to: '/buscar', label: 'Buscar', icone: <FiSearch size={26} /> },
  { to: '/perfil', label: 'Perfil', icone: <FiUser size={26} /> },
]

export default function BottomNav() {
  return (
    <nav className="barra-inferior" id="barra-inferior">
      {itens.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end
          className={({ isActive }) =>
            isActive ? 'item-menu ativo' : 'item-menu'
          }
        >
          {item.icone}
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}