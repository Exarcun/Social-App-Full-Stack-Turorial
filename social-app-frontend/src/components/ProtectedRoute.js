import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/api';

function ProtectedRoute({ children }) {
  const currentUser = authService.getCurrentUser();
  
  if (!currentUser) {
    // Reindirizza alla pagina di login se l'utente non è autenticato
    return <Navigate to="/login" />;
  }
  
  // Mostra il componente figlio se l'utente è autenticato
  return children;
}

export default ProtectedRoute;