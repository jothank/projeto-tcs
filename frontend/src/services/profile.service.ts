import axios, { Axios, AxiosResponse } from 'axios';



export interface IEmpresas {
    id?: number
    cnpj: string,
    name: string,
    phone: string,
    email: string,
    street: string,
    number: string,
    neighborhood: string,
    city: string,
    zipcode: string,
    state: string
}

export const listAllEmpresasApi = async (): Promise<AxiosResponse<IEmpresas[]>> => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/company/');
      return response;
    } catch (error) {
      console.error('Erro ao listar empresas:', error);
      throw error;
    }
  };

export const addEmpresaApi = async (empresaData: IEmpresas ): Promise<AxiosResponse<IEmpresas>> => {
    return await axios.post('http://localhost:8000/api/v1/company/', empresaData);
};

export const editEmpresaApi = async(empresaId: number, empresaData: IEmpresas): Promise<AxiosResponse<IEmpresas>> => {
    console.log('id da empresa:', empresaId )
    return await axios.put(`http://localhost:3001/empresas/${empresaId}`, empresaData)
    
}