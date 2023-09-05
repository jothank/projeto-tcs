import Home from '../pages/Home/Home';
import ConfirmPasswordReset from '../pages/Login/Components/ConfirmPasswordReset';
import PasswordReset from '../pages/Login/Components/PasswordReset';
import Register from '../pages/Login/Components/Register';
import Login from '../pages/Login/Login';
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoutes/ProtectedRoutes';
import PrivateRoute from './ProtectedRoutes/ProtectedRoutes';

export const AppRouts = () => {

    return (
        null
        // <Routes>
        //     <Route path="/" element={<Register />} />
        //     <Route path="/login" element={<Login />} />
        //     <Route path="/password/reset/" element={<PasswordReset />} />
        //     <Route path="/password-reset-cofirm/:UID/:Token" element={<ConfirmPasswordReset />} />

        //     {/* <Route element={<ProtectedRoute />}>
        //         <Route path="/home" element={<Home />} />
        //         <Route path="/products" element={<Home />} />
        //         <Route path="/etc" element={<Home />} />
        //     </Route> */}



        // </Routes>
    );
}

