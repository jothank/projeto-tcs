import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { AutheticatedContext } from "context/AuthProvider";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuth } = AutheticatedContext();

  console.log("auth", isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
