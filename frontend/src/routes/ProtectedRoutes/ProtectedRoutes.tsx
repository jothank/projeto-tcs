import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';

import { AutheticatedContext } from '../../context/AuthProvider';


interface ProtectedRouteProps  {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuth } = AutheticatedContext();
  
console.log('auth', isAuth)
  return isAuth ? <Outlet/> : <Navigate to="/" />
};

export default ProtectedRoute;