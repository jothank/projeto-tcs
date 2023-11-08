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
  price: number,
  costs: number[] | undefined
) => {
  try {
    const body = {
      name: name,
      date: date,
      costs: costs,
      total_price: price,
    };
    const response = await axios.post(BASE_URL + "fixed_expense/", body, {
      headers: await getAuthorizationHeader(),
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getFixedExpense = async () => {
  try {
    const response = await axios.get(BASE_URL + "fixed_expense/", {
      headers: await getAuthorizationHeader(),
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
