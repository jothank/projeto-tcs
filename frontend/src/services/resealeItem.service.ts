import { ResaleItemType } from "types/resaleItem.types";
import { BASE_URL } from "../config";
import axios from "axios";

export const setResaleItem = async (
    name: string,
    description: string,
    purchase_price: number
) => {
    const localStorageAccessToken = localStorage.getItem("accessToken");
    const accessToken = localStorageAccessToken
      ? JSON.parse(localStorageAccessToken)
      : null;
  
    console.log(accessToken);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    try {
        const response = await axios.post(
            BASE_URL + "resale_item/resaleitem/",
            {
                name,
                description,
                purchase_price  
            },
            {
                headers
            }
        );
        return response.data

    } catch(error) {
        throw new  Error("não foi dessa vez")
    }
}

export const deleteReleaseItem = async (id: number): Promise<void> => {
    const localStorageAccessToken = localStorage.getItem("accessToken");
    const accessToken = localStorageAccessToken
      ? JSON.parse(localStorageAccessToken)
      : null;
  
    console.log(accessToken);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  
    try {
      const response = await axios.delete(
        BASE_URL + `release_item/releaseitem/${id}/`,
        {
          headers,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Não foi possível excluir o item de lançamento.");
    }
  };
  
  export const getAllReleaseItems = async (): Promise<ResaleItemType[]> => {
    const localStorageAccessToken = localStorage.getItem('accessToken');
    const accessToken = localStorageAccessToken
      ? JSON.parse(localStorageAccessToken)
      : null;
  
    console.log(accessToken);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  
    try {
      const response = await axios.get(BASE_URL + 'resale_item/resaleitem/', {
        headers,
      });
      return response.data;
    } catch (error) {
      throw new Error('Não foi possível obter os itens de lançamento.');
    }
  };