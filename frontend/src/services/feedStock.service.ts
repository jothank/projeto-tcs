import { BASE_URL } from "../config";
import axios from "axios";
import { validationToken, refreshToken } from "./auth.service";
import Swal from "sweetalert2";
import { FeedStockType } from "types/FeedStock.type";

const forceLogout = () => {
  console.log("Chamando forceLogout"); // Adicione este log para depuração
  Swal.fire({
    icon: "error",
    title: "Erro",
    text: "Sua sessão expirou, faça login novamente.",
    showConfirmButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/login";
    }
  });
};
const getAuthorizationHeader = async (): Promise<{ Authorization: string }> => {
  try {
    await validationToken();
    const localStorageAccessToken = localStorage.getItem("accessToken");
    const accessToken = localStorageAccessToken
      ? JSON.parse(localStorageAccessToken)
      : null;

    return {
      Authorization: `Bearer ${accessToken}`,
    };
  } catch (error: any) {
    if (error.message === "401") {
      try {
        await refreshToken();
        await validationToken();
        const localStorageAccessToken = localStorage.getItem("accessToken");
        const accessToken = localStorageAccessToken
          ? JSON.parse(localStorageAccessToken)
          : null;

        return {
          Authorization: `Bearer ${accessToken}`,
        };
      } catch (refreshError) {
        forceLogout();
        throw refreshError;
      }
    } else {
      forceLogout();
      throw error;
    }
  }
};

export const setFeedStock = async (
  name: string,
  price: number,
  quantity: number,
  unity: string
) => {
  try {
    const response = await axios.post(
      BASE_URL + "feedstock/",
      {
        name,
        price,
        quantity,
        unity
      },
      {
        headers: await getAuthorizationHeader(),
      }
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

const handleRequestError = (error: any) => {
  if (error.response) {
    throw new Error(error.response.data?.detail || "Erro na requisição.");
  } else {
    throw new Error("Não foi possível completar a requisição.");
  }
};


export const updateFeedStock = async (
    id: number,
    name: string,
    price: number,
    quantity: number,
    unity: string
  ) => {
    try {
      const response = await axios.put(
        BASE_URL + `feedstock/${id}/`,
        {
          name,
          price,
          quantity,
          unity
        },
        {
          headers: await getAuthorizationHeader(),
        }
      );
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  };

  export const deleteFeedStock = async (id: number): Promise<void> => {
    try {
      const response = await axios.delete(BASE_URL + `feedstock/${id}/`, {
        headers: await getAuthorizationHeader(),
      });
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  };


  export const getAllFeedStocks = async (): Promise<FeedStockType[]> => {
    try {
      const response = await axios.get(BASE_URL + "feedstock/", {
        headers: await getAuthorizationHeader(),
      });
      return response.data?.results;
    } catch (error) {
      throw new Error("Não foi possível obter os itens de lançamento.");
    }
  };