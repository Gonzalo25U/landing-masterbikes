import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function FormReparacion() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    descripcion: ''
  })
  const [mensaje, setMensaje] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('reparacion').insert([formData])

    if (error) {
      console.error('Error Supabase:', error)
      setMensaje(`❌ Error: ${error.message}`)
    } else {
      setMensaje('✅ Solicitud de reparación enviada correctamente')
      setFormData({ nombre: '', email: '', descripcion: '' })
    }
  }

  return (
    <div className="formulario-box">
      <h3>Ingrese sus datos</h3>
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
        <textarea
          name="descripcion"
          placeholder="Describe el problema o servicio requerido"
          value={formData.descripcion}
          onChange={handleChange}
          required
          rows={4}
        />
        <button type="submit">Enviar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  )
}
