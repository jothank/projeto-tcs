import { BASE_URL } from "../config";
import axios from "axios";
import { getAuthorizationHeader } from "utils/GetHeader";
import { FixedExpenseType, ExpenseType } from "types/FixedExpenses.types";

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