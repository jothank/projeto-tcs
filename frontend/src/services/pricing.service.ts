import { BASE_URL } from "../config";
import axios from "axios";
import { getAuthorizationHeader } from "utils/GetHeader";
import { PricingType } from "types/pricing,types";

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

  

  export const getPricing = async () => {
    try {
      const response = await axios.get(BASE_URL + "pricing/", {
        headers: await getAuthorizationHeader(),
      });
  
      return response.data;
    } catch (error) {
      return error;
    }
  };
  