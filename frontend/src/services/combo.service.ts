import { BASE_URL } from "../config";
import axios from "axios";
import { getAuthorizationHeader } from "utils/GetHeader";

export const setCombo = async (
  registrations: Array<{}>,
  name: string,
  price: number
) => {
  try {
    const response = await axios.post(
      BASE_URL + "combo/",
      {
        name,
        registrations,
        purchase_price: price,
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
