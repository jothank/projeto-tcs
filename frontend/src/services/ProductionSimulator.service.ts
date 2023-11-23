import { BASE_URL } from "../config";
import axios from "axios";
import { getAuthorizationHeader } from "utils/GetHeader";

export const saveProductionSimulator = async (data: any) => {
  try {
    const response = await axios.post(
      BASE_URL + "production_simulator/",
      data,
      {
        headers: await getAuthorizationHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductionSimulator = async () => {
  try {
    const response = await axios.get(BASE_URL + "production_simulator/", {
      headers: await getAuthorizationHeader(),
    });
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
