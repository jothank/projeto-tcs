import { BASE_URL } from "../config";
import axios from "axios";
import { getAuthorizationHeader } from "utils/GetHeader";

export const saveCosts = async (costs: any) => {
  try {
    const response = await axios.post(
      BASE_URL + "cost/",
      { costs: costs },
      {
        headers: await getAuthorizationHeader(),
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const setFixedExpense = async (
  name: string,
  date: string,
  costs: number[]
) => {
  try {
    const body = {
      name: name,
      date: date,
      costs: costs,
    };
    const response = await axios.post(BASE_URL + "fixed_expense/", body, {
      headers: await getAuthorizationHeader(),
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
