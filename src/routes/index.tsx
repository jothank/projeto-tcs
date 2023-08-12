import { Navigate, useRoutes } from 'react-router-dom';
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
import { PATH_AFTER_LOGIN } from '../config-global';

import {
  Page404,
  LoginPage,
//   UserLogs,
//   Dashboard,
  Profile,
  UserManager,
} from './elements';
import { NewUserProvider } from '../context/newUserContext';
import { FeedbackProvider } from '../context/Feedback';


export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to={'/login'} replace />, index: true },
        {
          path: 'login',
          element: (

            <GuestGuard>
              <NewUserProvider>
                <FeedbackProvider>
                  <LoginPage />
                </FeedbackProvider>
              </NewUserProvider>
            </GuestGuard>

          ),
        },
      ],
    },
    {
      path: '/home',
      element: (
        <AuthGuard>
          <NewUserProvider>
            <FeedbackProvider>
              <DashboardLayout />
            </FeedbackProvider>
          </NewUserProvider>
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        // { path: 'metricas', element: <Dashboard /> },
        { path: 'perfil', element: <Profile /> },
        // { path: 'configuracoes', element: <Settings /> },
        // { path: 'logs', element: <UserLogs /> },
        { path: 'gerenciamento-de-clientes', element: <UserManager /> },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
