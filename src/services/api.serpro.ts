import axios, { AxiosResponse, CancelTokenSource } from 'axios';

export interface tokenAccess {
  access_token: string,
  scope: string,
  token_type: string,
  expires_in: number
}

//Api SERPRO
const apiSerpro = axios.create({
  baseURL: String(import.meta.env.VITE_HOST_SERPRO),
});

const isCancel = (error: Error) => axios.isCancel(error);
function getCancelTokenSource(): CancelTokenSource {
  return axios.CancelToken.source();
}

//Request TOKEN 
const options = {
  method: 'POST',
  url: 'https://gateway.apiserpro.serpro.gov.br/token',
  headers: {
    Authorization: 'Basic bkZUNFRSSlVRVXdiRTBfNEFjdDBsRXVveVNNYTpTNEY5Qm5iNTc2OV82ZWtySG1aRWIzT0lBZE1h'
  },
  data: 'grant_type=client_credentials'
};

export const tokenGererator = async (): Promise<AxiosResponse<tokenAccess>> => {
  return await axios.request(options);
};

//Interceptor TOKEN
apiSerpro.interceptors.request.use(async (config: any) => {
  console.log("Config", config);
  try {
    const dataToken = await tokenGererator();
    config.headers.Authorization = `Bearer ${dataToken.data.access_token}`;
    return config;
  } catch (err) {
    console.log(err);
  }

}, error => {
  return Promise.reject(error);
});

export { apiSerpro, isCancel, getCancelTokenSource };
