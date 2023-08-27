import axios, { Axios, AxiosResponse } from 'axios';
import { apiMock } from './api.mock';
import { apiGastroCustos } from './api.gastrocustos';

export interface IEmpresas {
    id?: number
    cnpj: string,
    nome: string,
    telefone: string,
    email: string,
    logradouro: string,
    numero: string,
    bairro: string,
    cidade: string,
    cep: string,
    uf: string
}

export const listAllEmpresasApi = async (): Promise<AxiosResponse<IEmpresas[]>> => {
    try {
      const response = await apiMock.get('http://localhost:8000/api/v1/company/');
      return response;
    } catch (error) {
      console.error('Erro ao listar empresas:', error);
      throw error;
    }
  };

export const addEmpresaApi = async (empresaData: IEmpresas ): Promise<AxiosResponse<IEmpresas>> => {
    return await apiGastroCustos.post('http://localhost:8000/api/v1/company/', empresaData);
};

export const editEmpresaApi = async(empresaId: number, empresaData: IEmpresas): Promise<AxiosResponse<IEmpresas>> => {
    console.log('id da empresa:', empresaId )
    return await apiGastroCustos.put(`http://localhost:3001/empresas/${empresaId}`, empresaData)
    
}