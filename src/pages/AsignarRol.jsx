import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function AsignarRol() {
  const [idUsuario, setIdUsuario] = useState('')
  const [mensaje, setMensaje] = useState('')

  const asignarAdmin = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({ rol: 'admin' })
      .eq('id', idUsuario)

    if (error) {
      setMensaje('Error al asignar rol: ' + error.message)
    } else {
      setMensaje('Rol asignado correctamente.')
    }
  }

  return (
    <div className="formulario-box">
      <h3>Asignar rol de administrador</h3>
      <input type="text" placeholder="ID del usuario" value={idUsuario} onChange={(e) => setIdUsuario(e.target.value)} />
      <button onClick={asignarAdmin}>Asignar Admin</button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  )
}
