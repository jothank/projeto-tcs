import { BASE_URL } from "../config";
import axios from "axios";
import { getAuthorizationHeader } from "utils/GetHeader";
import { FixedExpenseType, ExpenseType } from "types/FixedExpenses.types";



export const saveExpenses = async (expenses: ExpenseType[]) => {
  try {
    const response = await axios.post(BASE_URL + "expense/", expenses, {
      headers: await getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    return error;
  }
};


export const setfixedExpense = async (fixedExpense: FixedExpenseType) => {
  try {
    const response = await axios.post(
      BASE_URL + "fixed_expense/",
      fixedExpense,
      {
        headers: await getAuthorizationHeader(),
      }
    );
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
    return response.data.results;
  } catch (error) {
    throw error;
  }
};