import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function FormVenta() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    modelo: ''
  })
  const [mensaje, setMensaje] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('venta').insert([formData])

    if (error) {
      console.error('Error Supabase:', error)
      setMensaje(`❌ Error: ${error.message}`)
    } else {
      setMensaje('✅ Solicitud de venta enviada correctamente')
      setFormData({ nombre: '', email: '', modelo: '' })
    }
  }

  return (
    <div className="formulario-box">
      <h3>Formulario de Venta</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          placeholder="Tu nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <select
          name="modelo"
          value={formData.modelo}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un modelo</option>
          <option value="urbana">Urbana</option>
          <option value="montaña">Montaña</option>
          <option value="eléctrica">Eléctrica</option>
        </select>
        <button type="submit">Enviar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  )
}
