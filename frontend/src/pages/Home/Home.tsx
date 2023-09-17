import { useContext } from 'react';
import { AutheticatedContext } from '../../context/AuthProvider';
import { MenuLateral } from 'shared/components/menu-lateral/MenuLateral';
import { LayoutBasePage } from 'layout';


export default function Home() {
    const { isAuth } = AutheticatedContext();

  
    return (
        <div>
          <LayoutBasePage title='Home'>
          testando
            
          </LayoutBasePage>
          
        </div>
        

      );

}