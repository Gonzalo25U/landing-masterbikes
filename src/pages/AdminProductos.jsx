import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function AdminProductos() {
  const [productos, setProductos] = useState([])
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    tipo: 'urbana',
    precio: '',
    imagen: ''
  })

  const obtenerProductos = async () => {
    const { data, error } = await supabase.from('productos').select('*')
    if (error) console.error('Error cargando productos:', error)
    else setProductos(data)
  }

  useEffect(() => {
    obtenerProductos()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setNuevoProducto(prev => ({ ...prev, [name]: value }))
  }

  const handleAgregar = async () => {
    const { error } = await supabase.from('productos').insert([nuevoProducto])
    if (error) {
      console.error('Error al agregar producto:', error)
    } else {
      setNuevoProducto({ nombre: '', tipo: 'urbana', precio: '', imagen: '' })
      obtenerProductos()
    }
  }

  const handleEliminar = async (id) => {
    const { error } = await supabase.from('productos').delete().eq('id', id)
    if (error) console.error('Error al eliminar:', error)
    else obtenerProductos()
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Panel de Administración de Productos</h2>

      {/* Formulario agregar producto */}
      <div style={{ marginBottom: '2rem' }}>
        <h3>Agregar Producto</h3>
        <input
          name="nombre"
          placeholder="Nombre"
          value={nuevoProducto.nombre}
          onChange={handleChange}
        />
        <select name="tipo" value={nuevoProducto.tipo} onChange={handleChange}>
          <option value="urbana">Urbana</option>
          <option value="montaña">Montaña</option>
          <option value="eléctrica">Eléctrica</option>
        </select>
        <input
          name="precio"
          placeholder="Precio"
          type="number"
          value={nuevoProducto.precio}
          onChange={handleChange}
        />
        <input
          name="imagen"
          placeholder="URL Imagen"
          value={nuevoProducto.imagen}
          onChange={handleChange}
        />
        <button onClick={handleAgregar}>Agregar</button>
      </div>

      {/* Lista de productos */}
      <div>
        <h3>Productos Actuales</h3>
        {productos.length === 0 ? (
          <p>No hay productos registrados.</p>
        ) : (
          productos.map((p) => (
            <div key={p.id} style={{
              border: '1px solid #ccc',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '6px'
            }}>
              <p><strong>Nombre:</strong> {p.nombre}</p>
              <p><strong>Tipo:</strong> {p.tipo}</p>
              <p><strong>Precio:</strong> {p.precio}</p>
              <img src={p.imagen} alt={p.nombre} style={{ width: '100px' }} />
              <button onClick={() => handleEliminar(p.id)} style={{ marginTop: '1rem' }}>
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
