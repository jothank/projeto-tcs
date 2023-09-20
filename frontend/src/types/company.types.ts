export interface CompanyType {
  id?: any | null;
  name: string;
  users?: Array<any> | null;
  cnpj: string;
  email: string;
  phone: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export interface CompanyInputProps {
  name: string;
  label: string;
  type: string;
}

export interface CPPJCompanyInputProps {
  name: string;
  label: string;
}
