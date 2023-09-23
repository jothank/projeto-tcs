import { BASE_URL } from "../config";
import axios from "axios";
import {
  getLoginResponse,
  getRegisterResponse,
  getResetPasswordConfirmResponse,
} from "utils/validations/validationResponse";

const setUserLocalStorage = (userData: {
  user: any;
  access: any;
  refresh: any;
}) => {
  localStorage.setItem("user", JSON.stringify(userData.user));
  localStorage.setItem("accessToken", JSON.stringify(userData.access));
  localStorage.setItem("refreshToken", JSON.stringify(userData.refresh));
};

export const register = async (
  username: string,
  email: string,
  password1: string,
  password2: string,
  firstName: string,
  lastName: string
) => {
  try {
    const response = await axios.post(BASE_URL + "accounts/register/", {
      username,
      email,
      password1,
      password2,
      first_name: firstName,
      last_name: lastName,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getRegisterResponse(error));
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(BASE_URL + "accounts/login/", {
      username,
      password,
    });
    setUserLocalStorage(response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(getLoginResponse(error));
  }
};

export const passwordReset = async (email: string) => {
  try {
    const response = await axios.post(BASE_URL + "accounts/password/reset/", {
      email,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.email[0]);
  }
};

export const getURLParams = (url: string) => {
  const paramsArray = url.split("/").slice(-2);
  return {
    UID: paramsArray[0],
    TOKEN: paramsArray[1],
  };
};

export const confirmPasswordReset = async (
  url: string,
  newPassword1: string,
  newPassword2: string
) => {
  const { UID, TOKEN } = getURLParams(url);
  try {
    const response = await axios.post(
      `${BASE_URL}accounts/password/reset/confirm/${UID}/${TOKEN}`,
      {
        uid: UID,
        token: TOKEN,
        new_password1: newPassword1,
        new_password2: newPassword2,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(getResetPasswordConfirmResponse(error));
  }
};

export const confirmEmail = async (url: string) => {
  const { TOKEN } = getURLParams(url);
  try {
    const response = await axios.post(`${BASE_URL}accounts/verify-email/`, {
      key: TOKEN,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  return null;
};

export const refreshToken = async () => {
  const localStorageRefreshToken = localStorage.getItem("refreshToken");
  const refreshToken = localStorageRefreshToken
    ? JSON.parse(localStorageRefreshToken)
    : null;

  try {
    const response = await axios.post(BASE_URL + "accounts/token/refresh/", {
      refresh: refreshToken,
    });
    localStorage.setItem("accessToken", JSON.stringify(response.data.access));
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response.status);
  }
};

export const validationToken = async () => {
  const localStorageAccessToken = localStorage.getItem("accessToken");
  const accessToken = localStorageAccessToken
    ? JSON.parse(localStorageAccessToken)
    : null;

  try {
    const response = await axios.post(BASE_URL + "accounts/token/verify/", {
      token: accessToken,
    });
    return response;
  } catch (error: any) {
    throw new Error(error?.response.status);
  }
};

export const getResendEmail = async (email: string) => {
  try {
    const response = await axios.post(BASE_URL + "accounts/resend-email/", {
      email,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
