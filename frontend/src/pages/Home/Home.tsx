import {useContext} from 'react'
import { AutheticatedContext } from '../../context/AuthProvider';

export default function Home() {
    const { isAuth } = AutheticatedContext();
   return (
    <div>
      {isAuth ? (
        <h1>Bem-vindo à página protegida!</h1>
      ) : (
        <p>Você não está autenticado.</p>
      )}
    </div>
   )
}