import axios, { AxiosResponse } from 'axios';
import { AddressByCEP_DTO } from '../@types/DTO/utilDTO';
import { apiGastroCustos } from './api.gastrocustos';

export const addressByCEP = async (
  CEP: string,
): Promise<AxiosResponse<AddressByCEP_DTO>> => {
  return await axios.get(`https://viacep.com.br/ws/${CEP}/json/`);
};

export const sendOtpAPI = async (
  email : string
): Promise<AxiosResponse<any>> => {
  return await apiGastroCustos.post('user/send-otp/',{email: email},
    {
      headers:
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
};

export const validateOtpAPI = async (
  email : string,
  otp: number,
): Promise<AxiosResponse<any>> => {
  return await apiGastroCustos.post('/user/validate-otp/',{email: email, otp: otp},
    {
      headers:
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
};




