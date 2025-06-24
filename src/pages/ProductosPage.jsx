import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom'

export default function ProductosPage() {
  const [productos, setProductos] = useState([])
  const [rol, setRol] = useState(null)

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase.from('productos').select('*')
      if (error) console.error('Error al obtener productos:', error)
      else setProductos(data)
    }

    // Obtener el rol guardado en localStorage
    const rolGuardado = localStorage.getItem('rol')
    if (rolGuardado) setRol(rolGuardado)

    fetchProductos()
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Catálogo de Bicicletas</h2>

      {/* Botón solo visible para el admin */}
      {rol === 'admin' && (
        <div style={{ marginBottom: '1rem' }}>
          <Link to="/admin">
            <button style={{ backgroundColor: '#333', color: 'white', padding: '0.5rem 1rem' }}>
              Modificar Productos
            </button>
          </Link>
        </div>
      )}

      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        productos.map((p) => (
          <div key={p.id} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1.5rem'
          }}>
            <h3>{p.nombre}</h3>
            <p><strong>Tipo:</strong> {p.tipo}</p>
            <p><strong>Precio:</strong> {p.precio}</p>
            <img src={p.imagen} alt={p.nombre} style={{ width: '200px', marginTop: '1rem' }} />

            {/* Botón de compra solo para clientes */}
            {rol === 'cliente' && (
              <button
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={() => window.location.href = 'https://www.bancoestado.cl'}
              >
                Comprar
              </button>
            )}
          </div>
        ))
      )}
    </div>
  )
}
