import { BASE_URL } from "../config";
import axios from "axios";
import { getAuthorizationHeader } from "utils/GetHeader";

export const setProduct = async (
  name: string,
  price: number,
  feedstock_type: number,
  quantity: number,
  unit: string
) => {
  try {
    const response = await axios.post(
      BASE_URL + "product/",
      {
        name,
        price,
        quantity,
        feedstock_type,
        unit,
      },
      {
        headers: await getAuthorizationHeader(),
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateProduct = async (
  id: number,
  name: string,
  price: number,
  quantity: number,
  feedstock_type: number,
  unit: string
) => {
  try {
    const response = await axios.put(
      BASE_URL + `product/${id}/`,
      {
        name,
        price,
        quantity,
        feedstock_type,
        unit,
      },
      {
        headers: await getAuthorizationHeader(),
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const response = await axios.delete(BASE_URL + `product/${id}/`, {
      headers: await getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(BASE_URL + "product/", {
      headers: await getAuthorizationHeader(),
    });
    return response.data?.results;
  } catch (error) {
    return new Error("Não foi possível obter os produtos.");
  }
};
