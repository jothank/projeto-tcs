import { Suspense, lazy, ElementType } from 'react';
import LoadingScreen from '../components/loading-screen';

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );


export const LoginPage = Loadable(lazy(() => import('../pages/Login/LoginPage')));
export const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
export const Profile = Loadable(lazy(() => import('../pages/Profile')));
export const Settings = Loadable(lazy(() => import('../pages/Settings')));
export const UserManager = Loadable(lazy(() => import('../pages/UsersManager')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
