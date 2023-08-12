import React, { createContext, useContext, useState } from 'react';

interface NewUserContextDTO {
  user: NewUserBasicDataDTO;
  setUser: Function;
  CNPJdata: NewUserCNPJDTO;
  setCNPJData: Function;
  CNPJFile: Blob | null;
  setCNPJFile: Function;
  typeData: string;
  setTypeData: Function;
  userError: NewUserBasicErrorDTO;
  setUserError: Function;
  setCNPJError: Function;
  CNPJError: NewUserCNPJErrorDTO;
  CNPJFileError: string;
  setCNPJFileError: Function;
  paymentMethod: string;
  setPaymentMethod: Function;
  paymentMethodError: string;
  setPaymentMethodError: Function;
}

interface NewUserBasicDataDTO {
  name: string;
  email: string;
  phone: string;
}

interface NewUserBasicErrorDTO {
  nameError?: string;
  emailError?: string;
  phoneError?: string;
}

interface NewUserCNPJErrorDTO {
  cnpjError?: string;
  cityError?: string;
  organizationError?: string;
  stateError?: string;
  streetError?: string;
  neiborhoodError?: string;
  countryError?: string;
  numberError?: string;
  typeOrgError?: string;
}

interface NewUserCNPJDTO {
  cnpj: string;
  city: string;
  organization: string;
  state: string;
  street: string;
  neiborhood: string;
  country: string;
  number: string;
  typeOrg: string;
}

const NewUserContext = createContext<NewUserContextDTO>(
  {} as NewUserContextDTO,
);

const NewUserProvider: React.FC = ({ children } : any) => {
  const [user, setUser] = useState<NewUserBasicDataDTO>({
    name: '',
    email: '',
    phone: '',
  });
  const [CNPJdata, setCNPJData] = useState<NewUserCNPJDTO>({
    cnpj: '',
    city: '',
    organization: '',
    state: '',
    street: '',
    neiborhood: '',
    country: '',
    number: '',
    typeOrg: '',
  });
  const [CNPJFile, setCNPJFile] = useState<Blob | null>(null);
  const [typeData, setTypeData] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('prePago');

  const [CNPJFileError, setCNPJFileError] = useState('');
  const [userError, setUserError] = useState<NewUserBasicErrorDTO>({});
  const [CNPJError, setCNPJError] = useState<NewUserCNPJErrorDTO>({});
  const [paymentMethodError, setPaymentMethodError] = useState('');

  return (
    <NewUserContext.Provider
      value={{
        setUser,
        setCNPJData,
        setCNPJFile,
        setTypeData,
        user,
        CNPJdata,
        CNPJFile,
        typeData,
        userError,
        setUserError,
        setCNPJError,
        CNPJError,
        CNPJFileError,
        setCNPJFileError,
        paymentMethod,
        setPaymentMethod,
        paymentMethodError,
        setPaymentMethodError,
      }}
    >
      {children}
    </NewUserContext.Provider>
  );
};

function useNewUser(): NewUserContextDTO {
  return useContext(NewUserContext);
}

export { NewUserProvider, useNewUser };
