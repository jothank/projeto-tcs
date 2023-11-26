import { BASE_URL } from "../config";
import axios from "axios";
import { PricingType } from "types/pricing.types";
import { getAuthorizationHeader } from "utils/GetHeader";

export const setPricing = async (financialsPrincing: PricingType) => {
  try {
    const response = await axios.post(
      BASE_URL + "pricing/",
      financialsPrincing,
      {
        headers: await getAuthorizationHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPricing = async () => {
  try {
    const response = await axios.get(BASE_URL + "pricing/", {
      headers: await getAuthorizationHeader(),
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePricing = async ({
  id,
  condominium,
  tax,
  card_tax,
  other,
  profit,
  delivery_price,
}: {
  id: number;
  condominium: number;
  tax: number;
  card_tax: number;
  other: number;
  profit: number;
  delivery_price: number;
}) => {
  try {
    const response = await axios.put(
      `${BASE_URL}pricing/${id}/`,
      {
        condominium,
        tax,
        card_tax,
        other,
        profit,
        delivery_price,
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


export const deletePricing = async (id: any) => {
  try {
    const response = await axios.delete(BASE_URL + `pricing/${id}/`, {
      headers: await getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};