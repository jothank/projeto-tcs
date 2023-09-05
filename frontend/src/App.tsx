import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AutheticatedContext } from 'context/AuthProvider';
import Register from 'pages/Login/Components/Register';
import Login from 'pages/Login/Login';
import PasswordReset from 'pages/Login/Components/PasswordReset';
import ConfirmPasswordReset from 'pages/Login/Components/ConfirmPasswordReset';
import ProtectedRoute from 'routes/ProtectedRoutes/ProtectedRoutes';
import Home from 'pages/Home/Home';

function App() {
  const { isAuth } = AutheticatedContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/reset/" element={<PasswordReset />} />
        <Route
          path="/password-reset-cofirm/:UID/:Token"
          element={<ConfirmPasswordReset />}
        />
     
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
   
      </Routes>
    </BrowserRouter>
  );
}

export default App;
