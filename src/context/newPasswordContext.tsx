import { createContext, useCallback, useContext, useState } from 'react';

const NewPasswordContext = createContext<any>(null);

export interface NewPassWordDTO {
  password?: string,
  odt?: string,
  email?: string,
  confirmPassword? : string,
}

const NewPasswordProvider = ({ children }: any) => {

  const [newPassword, setNewPassword] = useState<NewPassWordDTO>({
    password: '',
    odt: '',
    email: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');

  const addNewPassword = useCallback((content: NewPassWordDTO) => {
    setNewPassword(content);
  }, []);

  const addPasswordErrors = useCallback((content: string) => {
    setPasswordError(content);
  }, []);

  return (
    <NewPasswordContext.Provider value={{
      addPasswordErrors,
      addNewPassword, 
      newPassword,
      passwordError
    }}
    >
      {children}
    </NewPasswordContext.Provider>
  );
};

function useNewPasswordContext() {
  return useContext(NewPasswordContext);
}

export { NewPasswordProvider, useNewPasswordContext  };
