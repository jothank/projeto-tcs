import { BASE_URL } from "../config";
import axios from "axios";
import { getAuthorizationHeader } from "utils/GetHeader";

interface Combo {
  id: number;
  name: string;
}

export const setCombo = async (products: Array<{}>, name: string) => {
  try {
    const response = await axios.post(
      BASE_URL + "combo/",
      {
        name,
        products,
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

export const getCombos = async () => {
  try {
    const response = await axios.get(BASE_URL + "combo/", {
      headers: await getAuthorizationHeader(),
    });
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

export const updateCombo = async (
  comboId: number,
  products: Array<{}>,
  name: string
) => {
  try {
    const response = await axios.put(
      BASE_URL + `combo/${comboId}/`,
      {
        name,
        products: products,
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

export const getComboById = async (comboId: number): Promise<Combo | null> => {
  try {
    const response = await axios.get(BASE_URL + `combo/${comboId}`, {
      headers: await getAuthorizationHeader(),
    });
    return response.data as Combo;
  } catch (error) {
    throw error;
  }
};
