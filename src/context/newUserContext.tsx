import { createContext, useCallback, useContext, useState } from 'react';
import { BasicTypeDTO, UserAddressDTO, UserAddressErrorDTO, UserFileDTO } from '../@types/DTO/loginDTO';

const NewUserContext = createContext<any>(null);

const NewUserProvider = ({ children }: any) => {
  
  const [newUser, setNewUser] = useState<BasicTypeDTO>({
    nome: '',
    telefone: '',
    email: '',
  });

  const [ newUserPassword, setNewUserPassword] = useState({
    senha: '',
    confirmarSenha: '',
  })

  const [newUserAdress, setNewUserAdress] = useState<UserAddressDTO>({
    street: '',
    state: '',
    country: '',
    neighborhood: '',
    city: '',
    number: '',
    cep: '',
  });

  const [newUserFile, setNewUserFile] = useState<UserFileDTO>({
    name: '',
    type:'',
    base64: '',
  });

  const [addressErrors, setAddressError] = useState<UserAddressErrorDTO>({
    street: '',
    state: '',
    country: '',
    neighborhood: '',
    city: '',
    number: '',
    cep: '',
  });

  const [basicErrors, setBasicError] = useState<string[]>([])
  const [passwordErrors, setPasswordError] = useState({
    senha: '',
    confirmarSenha: '',
  })

  const [fileErrors, setfileError] = useState('')
  const [newUserNameOrg, setNewUserNameOrg] = useState('');
  const [newUserDoc, setNewUserDoc] = useState('');
  const [newUserDocError, setNewUserDocError] = useState('');
  const [newUserTypeOrg, setNewUserTypeOrg] = useState('publica');
  const [isOrganization, setIsOrganization] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('prePago');

  const addNewUserNameOrg = useCallback((content: string) => {
    setNewUserNameOrg(content);
  }, []);

  const addPaymentMethod = useCallback((content: string) => {
    setPaymentMethod(content);
  }, []);

  const addNewUserFile = useCallback((content: UserFileDTO) => {
    setNewUserFile(content);
  }, []);

  const addIsOrganization = useCallback((content: boolean) => {
    setIsOrganization(content);
  }, []);


  const addNewUserDoc = useCallback((content: string) => {
    setNewUserDoc(content);
  }, []);

  const addNewUserTypeOrg = useCallback((content: string) => {
    setNewUserTypeOrg(content);
  }, []);

  const addNewUserAddress = useCallback((content: UserAddressDTO) => {
    setNewUserAdress(content);
  }, []);

  const addNewUser = useCallback((content: BasicTypeDTO) => {
    setNewUser(content);
  }, []);

  const addBasicErrors = useCallback((content: string[]) => {
    setBasicError(content);
  }, []);

  const addFileErrors = useCallback((content: string) => {
    setfileError(content);
  }, []);

  const addAddressErrors = useCallback((content: UserAddressErrorDTO) => {
    setAddressError(content);
  }, []);

  const addDocErrors = useCallback((content: string) => {
    setNewUserDocError(content);
  }, []);

  const  addNewUserPassword = useCallback((content: any) => {
    setNewUserPassword(content);
  }, []);

  const addPasswordError = useCallback((content: any) => {
    setPasswordError(content);
  }, []);



  return (
    <NewUserContext.Provider value={{
      addNewUser,
      addDocErrors,
      addNewUserAddress,
      addNewUserTypeOrg,
      addIsOrganization,
      addNewUserDoc,
      addNewUserNameOrg,
      addNewUserFile,
      addFileErrors,
      addPaymentMethod,
      newUser,
      newUserAdress,
      newUserDoc,
      newUserTypeOrg,
      addBasicErrors,
      addAddressErrors,
      basicErrors,
      addressErrors,
      newUserNameOrg,
      isOrganization,
      newUserFile,
      fileErrors,
      paymentMethod,
      newUserDocError,
      passwordErrors,
      addPasswordError,
      addNewUserPassword,
      newUserPassword,
      
    }}
    >
      {children}
    </NewUserContext.Provider>
  );
};

function useNewUserContext() {
  return useContext(NewUserContext);
}

export { NewUserProvider, useNewUserContext };
