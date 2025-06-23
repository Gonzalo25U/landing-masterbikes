import './App.css'
import logo from './assets/pictures/logoMasterBikes.png'
import { Link, Routes, Route } from 'react-router-dom'
import FormContacto from './components/FormContacto'
import ArriendoPage from './pages/ArriendoPage'
import VentaPage from './pages/VentaPage'
import ReparacionPage from './pages/ReparacionPage'

function App() {
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
        </nav>
      </header>
      

      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <h2>Tu bici. <span>Tu estilo.</span></h2>
          <p>Compra, arrienda o repara tu bicicleta con confianza.</p>
          <button>¡Comienza hoy!</button>
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
            <img src="https://cdn-icons-png.flaticon.com/512/3061/3061309.png" alt="Equipo MasterBikes" />
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
            <Link to="/venta">
              <button>Solicitar Venta</button>
            </Link>
          </div>
          <div className="servicio">
            <h3>Arriendo de Bicicletas</h3>
            <p>Renta una bicicleta por hora o día para disfrutar tu paseo.</p>
            <Link to="/arriendo">
              <button>Solicitar Arriendo</button>
            </Link>
          </div>
          <div className="servicio">
            <h3>Reparación y Mantenimiento</h3>
            <p>Servicio técnico completo para dejar tu bici como nueva.</p>
            <Link to="/reparacion">
              <button>Solicitar Reparación</button>
            </Link>
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

      {/* Rutas */}
      <Routes>
        <Route path="/arriendo" element={<ArriendoPage />} />
        <Route path="/venta" element={<VentaPage />} />
        <Route path="/reparacion" element={<ReparacionPage />} />
      </Routes>
    </div>

    
    
  )
}

export default App
