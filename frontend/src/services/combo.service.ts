import { BASE_URL } from "../config";
import axios from "axios";
import { getAuthorizationHeader } from "utils/GetHeader";

export const setCombo = async (
  products: Array<{}>,
  name: string,
) => {
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
    return error;
  }
};

export const getCombos = async () => {
  try {
    const response = await axios.get(BASE_URL + "combo/", {
      headers: await getAuthorizationHeader(),
    });
    return response.data.results;
  } catch (error) {
    return error;
  }
};
