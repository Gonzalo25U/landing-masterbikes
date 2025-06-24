import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  })
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    const { email, password, username } = formData

    // Crear usuario con supabase auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      setErrorMsg('No se pudo registrar el usuario: ' + error.message)
      console.error(error)
      return
    }

    const userId = data?.user?.id
    if (userId) {
      // Insertar perfil con el campo username y rol cliente
      const { error: perfilError } = await supabase.from('profiles').insert([
        {
          id: userId,
          username,
          rol: 'cliente'
        }
      ])

      if (perfilError) {
        setErrorMsg('Error al crear perfil de usuario: ' + perfilError.message)
        console.error(perfilError)
        return
      }

      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('rol', 'cliente')
      localStorage.setItem('username', username)
      navigate('/')
    }
  }

  return (
    <div className="formulario-box" style={{ marginTop: '4rem' }}>
      <h3>Registro de Usuario</h3>
      <form onSubmit={handleRegister}>
        <input
          name="username"
          placeholder="Nombre de usuario"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrarse</button>
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      </form>
    </div>
  )
}
