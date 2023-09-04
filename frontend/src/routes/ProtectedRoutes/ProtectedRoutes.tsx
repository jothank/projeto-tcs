import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext'; // Importe o AuthContext adequado

const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <>{element}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
