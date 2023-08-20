import { AxiosResponse } from 'axios';
import { apiSerpro } from './api.serpro';
import { check_CPF_DTO } from '../@types/DTO/SerproDTO';


export const checkCPF = async (
  cpf: string,
): Promise<AxiosResponse<check_CPF_DTO>> => {
  return await apiSerpro.get(`/consulta-cpf-df/v1/cpf/${cpf}`, 
  { headers: {
    accept: 'application/json',
    Authorization: 'Bearer bb77b42d-ee41-36dd-ad68-0f293279af6b'
  }});
};
