import { AxiosResponse } from 'axios';
import { apiGastroCustos } from './api.gastrocustos';
import { addNewUserDTO, getUsersDTO } from '../@types/DTO/usersDTO';
import { UserFileDTO } from '../@types/DTO/loginDTO';

export const addNewUserAPI = async (
  body: addNewUserDTO
): Promise<AxiosResponse<any>> => {
  return await apiGastroCustos.post('/user/',body,
    {
      headers:
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
};

export const loginAPI = async (
  email: string,
  password: string,
): Promise<AxiosResponse<any>> => {
  const body = {
    email,
    password
  }
  return await apiGastroCustos.post('/login/',body,
    {
      headers:
      {
        'Content-Type': 'application/x-www-form-urlencoded',

      }
    });
};

export const changePasswordAPI = async (
  email: string,
  otp: string,
  password : string,
): Promise<AxiosResponse<any>> => {
  const body = {
    email,
    otp,
    password
  }
  return await apiGastroCustos.post('/user/alterar-senha/',body,
    {
      headers:
      {
        'Content-Type': 'application/x-www-form-urlencoded',

      }
    });
};

export const addNewUserFileAPI = async (
  body: UserFileDTO
): Promise<AxiosResponse<any>> => {
  return await apiGastroCustos.post('/arquivos/',body,
    {
      headers:
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
};

export const listNewUserAPI = async (): Promise<AxiosResponse<getUsersDTO[]>> => {
  return await apiGastroCustos.get('/user/');
};

export const deleteNewUserAPI = async (
  idUser: number
): Promise<AxiosResponse<any>> => {
  return await apiGastroCustos.delete(`/user/${idUser}`);
};


export const getUserAPI = async (
  userID : number | string
  ): Promise<AxiosResponse<any>> => {
  return await apiGastroCustos.get(`/user/${userID}`);
};

export const approveUserAPI = async (
  userID : number
  ): Promise<AxiosResponse<any>> => {
  return await apiGastroCustos.post(`/user/approve/${userID}`);
};



// export const getFileAPI = async (
//   fileID : number
//   ): Promise<AxiosResponse<any>> => {
//   return await apiGastroCustos.get(`/arquivos/${fileID}`);
// };




