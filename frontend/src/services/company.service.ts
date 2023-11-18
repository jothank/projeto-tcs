import { BASE_URL } from "../config";
import axios from "axios";
import { getAuthorizationHeader } from "../utils/GetHeader";

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
        headers: await getAuthorizationHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
