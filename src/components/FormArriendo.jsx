import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function FormArriendo() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    dias: ''
  })

  const [mensaje, setMensaje] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('arriendo').insert([formData])

    if (error) {
      console.error('Error Supabase:', error)
      setMensaje(`❌ Error: ${error.message}`)
    } else {
      setMensaje('✅ Solicitud de arriendo enviada correctamente')
      setFormData({ nombre: '', email: '', dias: '' })
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
        <input
          name="dias"
          type="number"
          min="1"
          max="30"
          placeholder="Cantidad de días (1-30)"
          value={formData.dias}
          onChange={handleChange}
          required
        />
        <button type="submit">Enviar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  )
}
