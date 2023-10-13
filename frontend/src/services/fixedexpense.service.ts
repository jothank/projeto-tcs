import { BASE_URL } from "../config";
import axios from "axios";
import { getAuthorizationHeader } from "utils/GetHeader";

export const setfixedExpense = async (
  name: string,
  description: string,
  price: number,
  expenses: {
    name: string;
    description: string;
    price: number;
  }[],
  date: string,
  total_price: number,
) => {
  try {
    const response = await axios.post(
      BASE_URL + "fixed_expense/",
      {
        name,
        description,
        price,
        expenses,
        date,
        total_price,
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