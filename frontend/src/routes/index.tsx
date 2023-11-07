import React from "react";
import Home from "pages/Home/Home";
import ConfirmPasswordReset from "pages/Login/Components/ConfirmPasswordReset";
import Register from "pages/Login/Components/Register";
import Login from "pages/Login/Login";
import ConfirmEmail from "pages/Login/Components/ConfirmEmail";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "hooks/ProtectedRoutes/PrivateRoute";
import Company from "pages/Company/Company";
import ResaleItem from "pages/ResaleItem/ResaleItem";
import { Feedstock } from "pages/Feedstock/Feedstock";
import Product from "pages/Product/Product";
import { FixedExpense } from "pages/FixedExpenses/FixedExpenses";
import Princing from "pages/Pricing/Pricing";
import Combo from "pages/Combo/Combo";
import CommandProduct from "pages/Commands/CommandProduct";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route
        path="/password-reset-cofirm/:UID/:Token"
        element={<ConfirmPasswordReset />}
      />
      <Route path="/confirm-email/:Token" element={<ConfirmEmail />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      {/* <Route
        path="/company"
        element={
          <PrivateRoute>
            <Company />
          </PrivateRoute>
        }
      /> */}
      <Route
        path="/resale-item"
        element={
          <PrivateRoute>
            <ResaleItem />
          </PrivateRoute>
        }
      />
      <Route
        path="/feed-stock"
        element={
          <PrivateRoute>
            <Feedstock />
          </PrivateRoute>
        }
      />
      <Route
        path="/product"
        element={
          <PrivateRoute>
            <Product />
          </PrivateRoute>
        }
      />
      <Route
        path="/fixed-expense"
        element={
          <PrivateRoute>
            <FixedExpense />
          </PrivateRoute>
        }
      />
      <Route
        path="/pricing"
        element={
          <PrivateRoute>
            <Princing />
          </PrivateRoute>
        }
      />
      <Route
        path="/combo"
        element={
          <PrivateRoute>
            <Combo />
          </PrivateRoute>
        }
      />
     
      <Route
        path="/datasheet"
        element={
          <PrivateRoute>
            <CommandProduct />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
