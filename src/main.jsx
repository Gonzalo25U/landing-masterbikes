import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import VentaPage from './pages/VentaPage';
import ArriendoPage from './pages/ArriendoPage';
import ReparacionPage from './pages/ReparacionPage';
import ProductosPage from './pages/ProductosPage'
import AdminProductos from './pages/AdminProductos'
import './index.css';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterPage from './pages/RegisterPage'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/venta" element={<VentaPage />} />
        <Route path="/arriendo" element={<ArriendoPage />} />
        <Route path="/reparacion" element={<ReparacionPage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminProductos />
          </ProtectedRoute>
        } />  
        <Route path="/login" element={<LoginPage />} />    
        <Route path="/registro" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
