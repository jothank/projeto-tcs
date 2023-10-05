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
  price,
}: {
  name: string;
  supplies: supply[];
  price: number;
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}product/`,
      {
        name,
        supplies,
        price: price,
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

export const getProduct = async (id: number) => {
  try {
    const response = await axios.get(BASE_URL + `product/${id}/`, {
      headers: await getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllProduct = async () => {
  try {
    const response = await axios.get(BASE_URL + "product/", {
      headers: await getAuthorizationHeader(),
    });
    return response.data.results;
  } catch (error) {
    return error;
  }
};