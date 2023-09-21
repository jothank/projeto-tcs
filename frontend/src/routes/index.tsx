import Home from "pages/Home/Home";
import ConfirmPasswordReset from "pages/Login/Components/ConfirmPasswordReset";
import Register from "pages/Login/Components/Register";
import Login from "pages/Login/Login";
import ConfirmEmail from "pages/Login/Components/ConfirmEmail";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "hooks/ProtectedRoutes/PrivateRoute";
import Company from "pages/Company/Company";
import ResaleItem from "pages/ResaleItem/ResaleItem";
import { FeedStock } from "pages/FeedStock/FeedStock";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/cadastro" element={<Register />} />
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
      <Route
        path="/company"
        element={
          <PrivateRoute>
            <Company />
          </PrivateRoute>
        }
      />
      <Route
      path="/resale-item"
      element={
        <PrivateRoute>
          <ResaleItem />
        </PrivateRoute>
      } />

      <Route 
      path="/feed-stock"
      element={
        <PrivateRoute>
          <FeedStock />
        </PrivateRoute>
      }
      />
    
    </Routes>
  );
};
