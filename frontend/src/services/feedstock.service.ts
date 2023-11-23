import { BASE_URL } from "../config";
import axios from "axios";
import { getAuthorizationHeader } from "utils/GetHeader";

export const setfeedstock = async (
  name: string,
  price: number,
  quantity: number,
  unit: string,
  type: string
) => {
  try {
    const response = await axios.post(
      BASE_URL + "feedstock/",
      {
        name,
        price,
        quantity,
        unit,
        type,
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

export const updatefeedstock = async (
  id: number,
  name: string,
  price: number,
  quantity: number,
  unit: string,
  type: string
) => {
  try {
    const response = await axios.put(
      BASE_URL + `feedstock/${id}/`,
      {
        name,
        price,
        quantity,
        unit,
        type,
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

export const deletefeedstock = async (id: number) => {
  try {
    const response = await axios.delete(BASE_URL + `feedstock/${id}/`, {
      headers: await getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllfeedstocks = async () => {
  try {
    const response = await axios.get(BASE_URL + "feedstock/", {
      headers: await getAuthorizationHeader(),
    });
    return response.data?.results;
  } catch (error) {
    return new Error("Não foi possível obter os itens de lançamento.");
  }
};
