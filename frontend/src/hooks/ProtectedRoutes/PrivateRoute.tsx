import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validationToken, refreshToken } from "services/auth.service";
import NavBar from "components/NavBar/NavBar";
import { getLoginWarning } from "utils/ModalAlert";

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await validationToken();
        setIsValid(true);
      } catch (error: any) {
        if (error.message.includes("401")) {
          try {
            await refreshToken();
            await validationToken();
            setIsValid(true);
          } catch (innerError: any) {
            if (innerError.message.includes("401")) {
              getLoginWarning(
                "Erro ao autenticar usuário faça login novamente"
              );
            }
          }
        } else {
          getLoginWarning("Erro ao autenticar usuário faça login novamente");
        }
      }
    };

    checkAuthentication();
  }, [navigate]);

  const Loader = () => <div>Loading...</div>;

  return isValid === null ? (
    <Loader />
  ) : isValid ? (
    <>
      <NavBar />
      {children}
    </>
  ) : null;
};

export default PrivateRoute;
