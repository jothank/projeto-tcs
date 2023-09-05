import { useContext } from 'react';
import { AutheticatedContext } from '../../context/AuthProvider';
import MenuLateral from 'Layout/meuLateral/MenuLateral';

export default function Home() {
    const { isAuth } = AutheticatedContext();

  
    return (
        <div>
          <MenuLateral />
          
        </div>
        

      );

}