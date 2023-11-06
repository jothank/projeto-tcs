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
      return error;
    }
  };