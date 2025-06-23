import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import VentaPage from './pages/VentaPage';
import ArriendoPage from './pages/ArriendoPage';
import ReparacionPage from './pages/ReparacionPage';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/venta" element={<VentaPage />} />
        <Route path="/arriendo" element={<ArriendoPage />} />
        <Route path="/reparacion" element={<ReparacionPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
