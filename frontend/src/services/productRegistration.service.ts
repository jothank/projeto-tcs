import { BASE_URL } from "../config";
import axios from "axios";
import { getAuthorizationHeader } from "utils/GetHeader";

interface Product {
  feedstock: number;
  quantity: number;
  unit: string;
  price: number;
}

export const setProductRegistration = async ({
  name,
  products,
  purchasedPrice,
}: {
  name: string;
  products: Product[];
  purchasedPrice: number;
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}productregistration/`,
      {
        name,
        products,
        producion_price: purchasedPrice,
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

export const getProductRegistration = async (id: number) => {
  try {
    const response = await axios.get(BASE_URL + `productregistration/${id}/`, {
      headers: await getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export const getAllProductRegistration = async () => {
  try {
    const response = await axios.get(BASE_URL + "productregistration/", {
      headers: await getAuthorizationHeader(),
    });
    return response.data.results;
  } catch (error) {
    return error;
  }
};
