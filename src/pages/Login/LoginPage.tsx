import { Helmet } from 'react-helmet-async';
// sections
import Login from '../../sections/auth/Login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Gastro Custos</title>
      </Helmet>

      <Login />
    </>
  );
}
