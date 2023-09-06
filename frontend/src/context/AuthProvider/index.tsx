import { createContext, useContext, useState, ReactNode } from "react";

export interface AuthContextType {
  isAuth: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const initialAuthContext: AuthContextType = {
  isAuth: false, // Valor inicial, você pode ajustar conforme necessário
  setIsAuthenticated: () => {},
};

const AuthContext = createContext<AuthContextType | undefined>(
  initialAuthContext
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState(false);

  const setIsAuthenticated = (auth: boolean) => {
    setIsAuth(auth);
  };
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export function AutheticatedContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuthenticatedContext deve ser usado dentro de um AuthProvider"
    );
  }
  return context;
}
