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
    throw error;
  }
};
export const saveCost = async (costs: any) => {
  try {
    const response = await axios.post(
      BASE_URL + "cost/",
      { costs: [costs] },
      {
        headers: await getAuthorizationHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCost = async (cost: any) => {
  try {
    const response = await axios.put(
      BASE_URL + `cost/${cost.id}/`,
      { name: cost.name, price: cost.price, description: cost.description },
      {
        headers: await getAuthorizationHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCost = async (id: any) => {
  try {
    const response = await axios.delete(BASE_URL + `cost/${id}/`, {
      headers: await getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const setFixedExpense = async (
  name: string,
  date: string,
  price: number | undefined,
  costs: number[] | undefined,
  type: string,
  description: string
) => {
  try {
    const body = {
      name: name,
      date: date,
      costs: costs,
      total_price: price,
      type: type,
      description: description,
    };
    const response = await axios.post(BASE_URL + "fixed_expense/", body, {
      headers: await getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFixedExpense = async () => {
  try {
    const response = await axios.get(BASE_URL + "fixed_expense/", {
      headers: await getAuthorizationHeader(),
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateFixedExpense = async (fixedExpense: any, ids: any) => {
  try {
    const response = await axios.put(
      BASE_URL + `fixed_expense/${fixedExpense.id}/`,
      {
        name: fixedExpense.name,
        date: fixedExpense.date,
        type: fixedExpense.type,
        costs: ids,
      },
      {
        headers: await getAuthorizationHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateFixedExpenseManual = async (fixedExpense: any) => {
  try {
    const response = await axios.put(
      BASE_URL + `fixed_expense/${fixedExpense.id}/`,
      {
        name: fixedExpense.name,
        date: fixedExpense.date,
        type: fixedExpense.type,
        description: fixedExpense.description,
        total_price: fixedExpense.total_price,
        costs: [],
      },
      {
        headers: await getAuthorizationHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFixedExpense = async (id: any) => {
  try {
    const response = await axios.delete(BASE_URL + `fixed_expense/${id}/`, {
      headers: await getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
