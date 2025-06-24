import './App.css'
import logo from './assets/pictures/logoMasterBikes.png'
import logoMasterBikes from './assets/pictures/logopng.png'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import FormContacto from './components/FormContacto'

function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setUser(data.session.user)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        localStorage.setItem('user', JSON.stringify(session.user))
      } else {
        setUser(null)
        localStorage.removeItem('user')
        localStorage.removeItem('rol')
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('rol')
    navigate('/')
  }

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src={logo} alt="MasterBikes" />
          <h1>MasterBikes</h1>
        </div>
        <nav className="nav">
          <a href="#">Inicio</a>
          <a href="#servicios">Servicios</a>
          <a href="#contacto">Contacto</a>
          <Link to="/productos">Productos</Link>

          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/registro">Registrarse</Link>
            </>
          )}

          {user && (
            <>
              <button 
                onClick={handleLogout} 
                title="Cerrar sesión" 
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  marginLeft: '1rem'
                }}
                aria-label="Cerrar sesión"
              >
                {/* Ícono power SVG */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  height="25" 
                  viewBox="0 -3 24 24" 
                  width="25" 
                  fill="currentColor"
                  style={{ color: '#f44336' }}
                >
                  <path d="M13 3h-2v10h2V3zm-1 18c-4.41 0-8-3.59-8-8 0-3.95 2.88-7.22 6.75-7.88v2.02c-2.56.6-4.5 2.97-4.5 5.86 0 3.31 2.69 6 6 6s6-2.69 6-6c0-2.89-1.94-5.26-4.5-5.86v-2.02C17.12 5.78 20 9.05 20 13c0 4.41-3.59 8-8 8z"/>
                </svg>
              </button>
            </>
          )}
        </nav>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <h2>Tu bici. <span>Tu estilo.</span></h2>
          <p>Compra, arrienda o repara tu bicicleta con confianza.</p>
          <Link to="/login">
            <button>¡Comienza hoy!</button>
          </Link>
        </div>
        <div className="hero-img">
          <img src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png" alt="Bicicleta" />
        </div>
      </section>

      {/* Nosotros */}
      <section className="nosotros" id="nosotros">
        <div className="nosotros-container">
          <div className="nosotros-texto">
            <h2>Sobre Nosotros</h2>
            <p>
              En <strong>MasterBikes</strong>, nos apasiona el ciclismo. Creemos que cada persona merece una bicicleta que se adapte a su estilo de vida. Ya sea para transporte, aventura o deporte, estamos aquí para ayudarte.
            </p>
            <p>
              Contamos con técnicos expertos y ciclistas que entienden tus necesidades. Ofrecemos confianza, calidad y un servicio cálido y profesional.
            </p>
          </div>
          <div className="nosotros-imagen">
            <img src={logoMasterBikes} alt="Equipo MasterBikes" />
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="servicios" id="servicios">
        <h2>Nuestros Servicios</h2>
        <div className="servicio-lista">
          <div className="servicio">
            <h3>Venta de Bicicletas</h3>
            <p>Compra modelos nuevos o usados con garantía y asesoría personalizada.</p>
            {user ? (
              <Link to="/venta">
                <button>Solicitar Venta</button>
              </Link>
            ) : null}
          </div>
          <div className="servicio">
            <h3>Arriendo de Bicicletas</h3>
            <p>Renta una bicicleta por hora o día para disfrutar tu paseo.</p>
            {user ? (
              <Link to="/arriendo">
                <button>Solicitar Arriendo</button>
              </Link>
            ) : null}
          </div>
          <div className="servicio">
            <h3>Reparación y Mantenimiento</h3>
            <p>Servicio técnico completo para dejar tu bici como nueva.</p>
            {user ? (
              <Link to="/reparacion">
                <button>Solicitar Reparación</button>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* Contactos */}
      <section className="contacto" id="contacto">
        <div className="contacto-container">
          <div className="contacto-texto">
            <h2>¿Tienes preguntas?</h2>
            <p>Déjanos tu mensaje y te responderemos lo antes posible.</p>
          </div>
          <FormContacto />
        </div>
      </section>

      {/* footer */}
      <footer className="footer">
        <p>© 2025 MasterBikes. Todos los derechos reservados.</p>
        <div className="social-icons">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" />
          </a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" />
          </a>
        </div>
      </footer>

    </div>
  )
}

export default App
