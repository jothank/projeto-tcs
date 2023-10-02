import { validationToken, refreshToken } from "services/auth.service";
import { getLoginWarning } from "utils/ModalAlert";

export const getAuthorizationHeader = async (): Promise<{
  Authorization: string;
}> => {
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
        getLoginWarning("Sua sessão expirou, faça login novamente.");
        throw refreshError;
      }
    } else {
      getLoginWarning("Sua sessão expirou, faça login novamente.");
      throw error;
    }
  }
};
