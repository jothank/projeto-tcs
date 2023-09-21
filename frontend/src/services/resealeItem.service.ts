import { ResaleItemType } from "types/resaleItem.types";
import { BASE_URL } from "../config";
import axios from "axios";
import { validationToken, refreshToken } from "./auth.service";

const getAuthorizationHeader = async (): Promise<{ Authorization: string }> => {
  try {
    await validationToken();
  } catch (error: any) {
    if (error.message === "401") {
      await refreshToken();
      await validationToken();
    }
  }
  const localStorageAccessToken = localStorage.getItem("accessToken");
  const accessToken = localStorageAccessToken
    ? JSON.parse(localStorageAccessToken)
    : null;

  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

const handleRequestError = (error: any) => {
  if (error.response) {
    throw new Error(error.response.data?.detail || "Erro na requisição.");
  } else {
    throw new Error("Não foi possível completar a requisição.");
  }
};

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
    handleRequestError(error);
  }
};

export const updateResealeItem = async (
  id: number,
  name: string,
  description: string,
  purchase_price: number
) => {
  try {
    const response = await axios.put(
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
    handleRequestError(error);
  }
};

export const deleteReleaseItem = async (id: number): Promise<void> => {
  try {
    const response = await axios.delete(BASE_URL + `resale_item/${id}/`, {
      headers: await getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getAllReleaseItems = async (): Promise<ResaleItemType[]> => {
  try {
    const response = await axios.get(BASE_URL + "resale_item/", {
      headers: await getAuthorizationHeader(),
    });
    return response.data?.results;
  } catch (error) {
    throw new Error("Não foi possível obter os itens de lançamento.");
  }
};
