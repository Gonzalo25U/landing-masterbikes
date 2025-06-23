import { useState } from 'react';
import { supabase } from '../supabaseClient';
import FormReparacion from '../components/FormReparacion'
function ReparacionPage() {
  const [formData, setFormData] = useState({ nombre: '', email: '', descripcion: '' });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('reparacion').insert([formData]);

    if (error) {
      setMensaje('Error al enviar el formulario.');
      console.error(error);
    } else {
      setMensaje('Solicitud de reparación enviada correctamente.');
      setFormData({ nombre: '', email: '', descripcion: '' });
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Formulario de Reparación</h1>
      <FormReparacion />
    </div>
  );
}

export default ReparacionPage;
