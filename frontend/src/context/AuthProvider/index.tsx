import { createContext, useCallback, useContext, useState } from 'react';

const AuthContext = createContext<any>(null);

const  AutheticatedProvider = ({ children }: any) => {

  const [ isAuth, setIsAuth] = useState(true)

  const addAuth = useCallback((content: boolean) => {
    setIsAuth(content);
  }, []);

  return (
    <AuthContext.Provider value={{
        addAuth,
        isAuth
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function AutheticatedContext() {
  return useContext(AuthContext);
}

export { AutheticatedProvider, AutheticatedContext  };