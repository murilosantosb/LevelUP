import { FiUsers, FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { profile } from '../services/mockProfile'
import cardContinue from '../assets/motPerfil.png'
import './Perfil.css'

export default function Perfil() {
  const navigate = useNavigate()

  function handleLogout() {
    navigate('/login')
  }

  return (
    <div id="tela-perfil">
      <section className="topo-perfil">
        <div className="avatar-perfil" />
        <h1 className="nome-perfil">{profile.name}</h1>
        <p className="usuario-perfil">{profile.username}</p>

        <div className="estatisticas-perfil">
          <div className="estatistica">
            <span className="valor-estatistica">
              <FiUsers size={16} color="var(--primary)" />
              {profile.followers}
            </span>
            <span className="rotulo-estatistica">Seguidores</span>
          </div>

          <div className="divisor-estatistica" />

          <div className="estatistica">
            <span className="valor-estatistica">{profile.days}</span>
            <span className="rotulo-estatistica">Dias</span>
          </div>
        </div>

        <button className="botao-logout" onClick={handleLogout}>
          <FiLogOut size={16} />
          Sair da conta
        </button>
      </section>

      <section id="semana-treinos" className="semana-treinos">
        {profile.week.map((item) => (
          <div key={item.label} className="dia-semana">
            <span
              className={item.trained ? 'ponto-dia treinou' : 'ponto-dia'}
            />
            <span className="rotulo-dia">{item.label}</span>
            <span className="numero-dia">{item.day}</span>
          </div>
        ))}
      </section>

      <section className="cards-perfil">
        <div className="card-amigos">
          <strong>Friends</strong>
          <span className="amigos-online">
            {profile.friendsOnline} online
          </span>
        </div>

        <img
          className="imagem-incentivo"
          src={cardContinue}
          alt="Continue! Você está evoluindo."
        />
      </section>

      <section className="feed-perfil">
        <h2 className="titulo-secao">Feed</h2>
        <div className="grade-fotos">
          {profile.photos.map((photo) => (
            <img
              key={photo.id}
              className="foto-grade"
              src={photo.imageUrl}
              alt="Foto de treino"
            />
          ))}
        </div>
      </section>
    </div>
  )
}
