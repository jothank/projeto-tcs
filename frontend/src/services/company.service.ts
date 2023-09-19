import { BASE_URL } from "../config";
import axios from "axios";

export const setCompany = async (
  name: string,
  cnpj: string,
  email: string,
  phone: string,
  street: string,
  number: string,
  neighborhood: string,
  city: string,
  state: string,
  country: string,
  zipcode: string
) => {
  const localStorageAccessToken = localStorage.getItem("accessToken");
  const accessToken = localStorageAccessToken
    ? JSON.parse(localStorageAccessToken)
    : null;

  console.log(accessToken);
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const response = await axios.post(
      BASE_URL + "company/",
      {
        name,
        cnpj,
        email,
        phone,
        street,
        number,
        neighborhood,
        city,
        state,
        country,
        zipcode,
      },
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("deu ruim");
  }
};
