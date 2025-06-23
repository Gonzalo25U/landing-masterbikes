import { useState } from 'react';
import { supabase } from '../supabaseClient';
import FormArriendo from '../components/FormArriendo'
function ArriendoPage() {
  const [formData, setFormData] = useState({ nombre: '', email: '', dias: '' });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dias = parseInt(formData.dias, 10);
    const { data, error } = await supabase.from('arriendo').insert([{ ...formData, dias }]);

    if (error) {
      setMensaje('Error al enviar el formulario.');
      console.error(error);
    } else {
      setMensaje('Solicitud de arriendo enviada correctamente.');
      setFormData({ nombre: '', email: '', dias: '' });
    }
  };

  return (
    <div className="formulario-page">
      <h1 style={{ textAlign: 'center', marginTop: '2rem', color: '#333' }}>Formulario de Arriendo</h1>
      <FormArriendo />
    </div>
  );
}

export default ArriendoPage;
