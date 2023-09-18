export interface CompanyType {
  id?: any | null;
  users?: Array<any> | null;
  name: string;
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

export {};
