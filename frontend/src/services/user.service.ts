import { BASE_URL } from "../config";
import axios from "axios";
import { User } from "pages/User/User";
import { getAuthorizationHeader } from "utils/GetHeader";

export const getUser = async () => {
  try {
    const response = await axios.get(
      BASE_URL + "accounts/user/",

      { headers: await getAuthorizationHeader() }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateUser = async (data: User) => {
  try {
    const response = await axios.patch(
      BASE_URL + "accounts/user/",
      {
        username: data.username,
        first_name: data.firstName,
        last_name: data.lastName,
      },
      {
        headers: await getAuthorizationHeader(),
      }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const updatePassword = async (data: any) => {
  try {
    const response = await axios.post(
      BASE_URL + "accounts/password/change/",
      {
        old_password: data.oldPassword,
        new_password1: data.newPassword1,
        new_password2: data.newPassword2,
      },
      {
        headers: await getAuthorizationHeader(),
      }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
