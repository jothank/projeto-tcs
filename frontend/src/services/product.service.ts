import { BASE_URL } from "../config";
import axios from "axios";
import { getAuthorizationHeader } from "utils/GetHeader";

export interface Supply {
  products: any;
  feedstock_type: number;
  price: number;
  quantity: number;
  unit: string;
}

export const setSupplies = async (data: {
  supplies: any;
}): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}supply/`, data, {
      headers: await getAuthorizationHeader(),
    });
    console.log(response.data);

    return response.data.supplies;
  } catch (error) {
    return error;
  }
};

export const updateSupply = async (
  id: number,
  price: number,
  quantity: number,
  feedstock_type: number,
  unit: string
) => {
  try {
    const response = await axios.put(
      BASE_URL + `supply/${id}/`,
      {
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

export const deleteSupply = async (id: number) => {
  try {
    const response = await axios.delete(BASE_URL + `supply/${id}/`, {
      headers: await getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllSupplies = async () => {
  try {
    const response = await axios.get(BASE_URL + "supply/", {
      headers: await getAuthorizationHeader(),
    });
    return response.data?.results;
  } catch (error) {
    return new Error("Não foi possível obter os produtos.");
  }
};
