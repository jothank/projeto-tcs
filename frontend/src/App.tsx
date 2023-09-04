import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import PasswordReset from "./pages/Login/Components/PasswordReset";
import ConfirmPasswordReset from "./pages/Login/Components/ConfirmPasswordReset";
import Register from "./pages/Login/Components/Register";
import ProtectedRoute from "./routes/ProtectedRoutes/ProtectedRoutes";
import Home from "./pages/Home/Home";

const App: React.FC = () => {
  
  return (
<>
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Home />} />}
        />


          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/password-reset-cofirm/:UID/:Token" element={<ConfirmPasswordReset />} />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  );
};

export default App;
