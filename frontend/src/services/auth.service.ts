import { BASE_URL } from "../config";
import axios from "axios";
import {
  getLoginResponse,
  getRegisterResponse,
} from "utils/validationResponse";

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
    const response = await axios.post(BASE_URL + "register/", {
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
  console.log("login test", username, password);
  try {
    const response = await axios.post(BASE_URL + "login/", {
      username,
      password,
    });
    setUserLocalStorage(response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.non_field_errors[0]);
  }
};

export const passwordReset = async (email: string) => {
  try {
    const response = await axios.post(BASE_URL + "password/reset/", {
      email,
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
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
      `${BASE_URL}password/reset/confirm/${UID}/${TOKEN}`,
      {
        uid: UID,
        token: TOKEN,
        new_password1: newPassword1,
        new_password2: newPassword2,
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response.data || "Error confirming password reset.");
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
