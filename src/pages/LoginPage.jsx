import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setErrorMsg('Correo o contraseña inválidos.')
      console.error(error)
      return
    }

    const { user } = data
    localStorage.setItem('user', JSON.stringify(user))

    // Obtén rol y username desde la tabla profiles
    const { data: perfil, error: perfilError } = await supabase
      .from('profiles')
      .select('rol, username')
      .eq('id', user.id)
      .single()

    if (perfilError) {
      console.error('Error al obtener perfil:', perfilError)
      setErrorMsg('Error al obtener perfil de usuario.')
      return
    }

    localStorage.setItem('rol', perfil.rol)
    localStorage.setItem('username', perfil.username)

    navigate('/') // Redirige al inicio
  }

  return (
    <div className="formulario-box" style={{ marginTop: '4rem' }}>
      <h3>Iniciar Sesión</h3>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      </form>
    </div>
  )
}
