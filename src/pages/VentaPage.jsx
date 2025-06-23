import { useState } from 'react';
import { supabase } from '../supabaseClient';
import FormVenta from '../components/FormVenta'
function VentaPage() {
  const [formData, setFormData] = useState({ nombre: '', email: '', modelo: '' });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('venta').insert([formData]);

    if (error) {
      setMensaje('Error al enviar el formulario.');
      console.error(error);
    } else {
      setMensaje('Solicitud enviada correctamente.');
      setFormData({ nombre: '', email: '', modelo: '' });
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Formulario de Venta</h1>
      <FormVenta />
    </div>
  );
}

export default VentaPage;