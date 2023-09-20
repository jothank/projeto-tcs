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