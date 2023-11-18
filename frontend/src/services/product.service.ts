import { BASE_URL } from "../config";
import axios from "axios";
import { getAuthorizationHeader } from "utils/GetHeader";

interface supply {
  feedstock: number;
  quantity: number;
  unit: string;
  price: number;
}

export const setProduct = async ({
  name,
  supplies,
}: {
  name: string;
  supplies: number[];
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}product/`,
      {
        name,
        supplies,
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

export const updateProduct = async ({
  id,
  name,
  supplies,
  price,
}: {
  id: number;
  name: string;
  supplies: number[];
  price: number;
}) => {
  try {
    const response = await axios.put(
      `${BASE_URL}product/${id}/`,
      {
        name,
        supplies: supplies,
        price: price,
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

export const getProduct = async (id: number) => {
  try {
    const response = await axios.get(BASE_URL + `product/${id}/`, {
      headers: await getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProduct = async () => {
  try {
    const response = await axios.get(BASE_URL + "product/", {
      headers: await getAuthorizationHeader(),
    });
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
