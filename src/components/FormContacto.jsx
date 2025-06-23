import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function FormContacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  })
  const [estado, setEstado] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('contacto').insert([formData])
    if (error) {
      console.error(error)
      setEstado('❌ Error al enviar el mensaje')
    } else {
      setEstado('✅ Mensaje enviado correctamente')
      setFormData({ nombre: '', email: '', mensaje: '' })
    }
  }

  return (
    <form className="contacto-form" onSubmit={handleSubmit}>
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
        placeholder="Tu correo"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <textarea
        name="mensaje"
        placeholder="Escribe tu mensaje"
        value={formData.mensaje}
        onChange={handleChange}
        required
        rows={4}
      />
      <button type="submit">Enviar</button>
      {estado && <p>{estado}</p>}
    </form>
  )
}
