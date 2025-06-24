import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRoles }) {
  const rol = localStorage.getItem('rol');

  if (!rol || !allowedRoles.includes(rol)) {
    return <Navigate to="/login" />;
  }

  return children;
}