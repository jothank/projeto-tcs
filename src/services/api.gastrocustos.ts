import axios, { CancelTokenSource } from 'axios';
import { getToken } from '../utils/isAuth';
import { useNavigate } from 'react-router';


const apiGastroCustos = axios.create({
  baseURL: String(import.meta.env.VITE_HOST_GASTRO),
});



apiGastroCustos.interceptors.request.use(
  
  async (req) => {
    const getToken = localStorage.getItem("accessToken");
    req.headers['Authorization'] = `Bearer ${getToken}`;
    return req;
  },
   (error) => {
    return Promise.reject(error);
  },
);

apiGastroCustos.interceptors.response.use(
  function (response) {
    return response;
  },
  function (er) {
    if (axios.isAxiosError(er)) {
      if (er.response) {
        if (er.response.status == 401) {
          useNavigate()("/login");

        }
      }
    }

    return Promise.reject(er);
  }
);


const isCancel = (error: Error) => axios.isCancel(error);

function getCancelTokenSource(): CancelTokenSource {
  return axios.CancelToken.source();
  
}

export { apiGastroCustos, isCancel, getCancelTokenSource };
