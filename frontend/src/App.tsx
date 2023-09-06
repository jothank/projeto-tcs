import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AutheticatedContext } from 'context/AuthProvider';
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
