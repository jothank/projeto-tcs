import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import Login from "./pages/Login/Login";
import PasswordReset from "./pages/Login/Components/PasswordReset";
import ConfirmPasswordReset from "./pages/Login/Components/ConfirmPasswordReset";
import Register from "./pages/Login/Components/Register";

import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
    {
        path: "/",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/password-reset",
        element: <PasswordReset />
    },
    {
        path: "/password-reset-cofirm/:UID/:Token",
        element: <ConfirmPasswordReset />
    }


])

ReactDom.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
       <RouterProvider router={router} />
    </React.StrictMode>
)