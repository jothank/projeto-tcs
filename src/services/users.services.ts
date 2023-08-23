import { AxiosResponse } from 'axios';
import { apiGastroCustos } from './api.gastrocustos';
import { addNewUserDTO, getUsersDTO } from '../@types/DTO/usersDTO';
import { UserFileDTO } from '../@types/DTO/loginDTO';

export const addNewUserAPI = async (
  body: addNewUserDTO
): Promise<AxiosResponse<any>> => {
  return await apiGastroCustos.post('register/',body,
    {
      headers:
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
};

export const loginAPI = async (
  username: string,
  password: string,
): Promise<AxiosResponse<any>> => {
  const body = {
    username,
    password
  }
  return await apiGastroCustos.post( 'login/',body,
    {
      headers:
      {
        'Content-Type': 'application/json',

      }
    });
};

export const changePasswordAPI = async (
  email: string,
  otp: string,
  new_password1 : string,
  new_password2 : string,
): Promise<AxiosResponse<any>> => {
  const body = {
    email,
    otp,
    new_password1,
    new_password2
  }
  return await apiGastroCustos.post('password/reset/',body,
    {
      headers:
      {
        'Content-Type': 'application/x-www-form-urlencoded',

      }
    });
};

// export const addNewUserFileAPI = async (
//   body: UserFileDTO
// ): Promise<AxiosResponse<any>> => {
//   return await apiGastroCustos.post('/arquivos/',body,
//     {
//       headers:
//       {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     });
// };

export const listNewUserAPI = async (): Promise<AxiosResponse<getUsersDTO[]>> => {
  return await apiGastroCustos.get('/');
};

export const deleteNewUserAPI = async (
  idUser: number
): Promise<AxiosResponse<any>> => {
  return await apiGastroCustos.delete(`/${idUser}`);
};


export const getUserAPI = async (
  userID : number | string
  ): Promise<AxiosResponse<any>> => {
  return await apiGastroCustos.get(`/${userID}`);
};



// export const getFileAPI = async (
//   fileID : number
//   ): Promise<AxiosResponse<any>> => {
//   return await apiGastroCustos.get(`/arquivos/${fileID}`);
// };




