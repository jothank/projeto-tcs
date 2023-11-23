import { BASE_URL } from "config";
import axios from "axios";
import { getAuthorizationHeader } from "utils/GetHeader";

export const setResaleItem = async (
  name: string,
  description: string,
  purchase_price: number
) => {
  try {
    const response = await axios.post(
      BASE_URL + "resale_item/",
      {
        name,
        description,
        purchase_price,
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

export const updateResealeItem = async (
  id: number,
  name: string,
  description: string,
  purchase_price: number
) => {
  try {
    const response = await axios.post(
      BASE_URL + `resale_item/${id}/`,
      {
        name,
        description,
        purchase_price,
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

export const deleteReleaseItem = async (id: number) => {
  try {
    const response = await axios.delete(BASE_URL + `resale_item/${id}/`, {
      headers: await getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllReleaseItems = async () => {
  try {
    const response = await axios.get(BASE_URL + "resale_item/", {
      headers: await getAuthorizationHeader(),
    });
    return response.data?.results;
  } catch (error) {
    return new Error("Não foi possível obter os itens de lançamento.");
  }
};
