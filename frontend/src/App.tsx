import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AutheticatedContext } from 'context/AuthProvider';
import Register from 'pages/Login/Components/Register';
import Login from 'pages/Login/Login';
import PasswordReset from 'pages/Login/Components/PasswordReset';
import ConfirmPasswordReset from 'pages/Login/Components/ConfirmPasswordReset';
import ProtectedRoute from 'routes/ProtectedRoutes/ProtectedRoutes';
import Home from 'pages/Home/Home';
import { AppRouts } from 'routes';

function App() {
  

  return (
    <BrowserRouter>
    <AuthProvider>
    <AppRouts />

    </AuthProvider>
    

    </BrowserRouter>
  );
}

export default App;
