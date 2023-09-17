import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AutheticatedContext } from 'context/AuthProvider';
import { AppRouts } from 'routes';
import { ThemeProvider } from '@mui/material';
import { Theme } from 'shared/themes';
import { MenuLateral } from 'shared/components';
import { AppDrawerProvider } from 'shared/context';


function App() {
  

  return (
    <ThemeProvider theme={Theme}>
      <AppDrawerProvider>
    <BrowserRouter>
    <AuthProvider>
      <MenuLateral>
    <AppRouts />
    </MenuLateral>
    </AuthProvider>
    </BrowserRouter>
    </AppDrawerProvider>
    </ThemeProvider>
  );
}

export default App;
