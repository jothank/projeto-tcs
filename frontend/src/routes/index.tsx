import {useEffect} from 'react'
import Home from "../pages/Home/Home";
import ConfirmPasswordReset from "../pages/Login/Components/ConfirmPasswordReset";
import PasswordReset from "../pages/Login/Components/PasswordReset";
import Register from "../pages/Login/Components/Register";
import Login from "../pages/Login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoutes";


import { useDraweContext } from "shared/context";
import Profile from 'pages/Profile/Profile';
import FeedStock from 'pages/FeedStock/FeedStock';
import FixedExpense from 'pages/fixedExpense/FixedExpense';
import { MenuLateral } from 'shared/components';

export const AppRouts: React.FC = () => {
  const { setDrawerOptions} = useDraweContext();

        useEffect(() => {
          setDrawerOptions([
          {
            path: '/home',
           label: 'Home'
          },
          {
            path: '/profile',
           label: 'Empresa'
          },
          {
            path: '/feed-stock',
           label: 'Feed Stock'
          },
          {
            path: '/fixed-expense',
           label: 'Fixed Expense'
          },

        ])
        })

  return (
    <>
    
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/password/reset/" element={<PasswordReset />} />
      <Route
        path="/password-reset-cofirm/:UID/:Token"
        element={<ConfirmPasswordReset />}
      />
      {/* <Route element={ <MenuLateral/>} > */}
      <Route path='/fixed-expense' element={<FixedExpense /> } />
      <Route path="/feed-stock" element={<FeedStock />} />
      <Route path='/profile' element={<Profile />} />
      {/* <Route path="/home" element={<ProtectedRoute element={<Home />} />} /> */}
      <Route path="/home" element={<Home />}  />
      {/* </Route> */}
      
    </Routes>
    </>
  );
};







