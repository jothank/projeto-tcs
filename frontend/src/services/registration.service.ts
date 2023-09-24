import { BASE_URL } from "../config";
import axios from "axios";
import { getAuthorizationHeader } from "utils/GetHeader";

export const setProducts = async (
  name : String,
  products: Array<{}>,
  prurchedPrice : number,
) => {
  try {
    const response = await axios.post(
      BASE_URL + "productregistration/",
      {
        name,
        products,
        producion_price : prurchedPrice,
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

export const getAllRegistration = async () => {
  try {
    const response = await axios.get(BASE_URL + "productregistration/", {
      headers: await getAuthorizationHeader(),
    });
    return response.data?.results;
  } catch (error) {
    return new Error("Não foi possível obter os itens de lançamento.");
  }
};
