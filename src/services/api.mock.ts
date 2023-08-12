import axios, { AxiosResponse, CancelTokenSource } from 'axios';

export interface tokenAccess {
  access_token: string,
  scope: string,
  token_type: string,
  expires_in: number
}

//Api SERPRO
const apiMock = axios.create({
  baseURL: String(import.meta.env.VITE_HOST_MOCK),
});

const isCancel: any = (error: Error) => axios.isCancel(error);
function getCancelTokenSource(): CancelTokenSource {
  return axios.CancelToken.source();
}



//Interceptor TOKEN


export {apiMock ,isCancel, getCancelTokenSource };
