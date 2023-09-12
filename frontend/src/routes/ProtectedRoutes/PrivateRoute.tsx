import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validationToken, refreshToken } from "services/auth.service";

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
        console.log(error.status)
        if (error.message.includes("401")) {
          try {
            console.log("Refreshing token...");
            await refreshToken();
            await validationToken();
            setIsValid(true);
          } catch (innerError: any) {
            if (innerError.message.includes("401")) {
              navigate("/login");
            }
          }
        } else if (error.message.includes("400")) {
          navigate("/login");
        } else {
          console.error("Unknown error during token validation:", error);
        }
      }
    };

    checkAuthentication();
  }, [navigate]);

  const Loader = () => <div>Loading...</div>;

  return isValid === null ? <Loader /> : isValid ? children : null;
};

export default PrivateRoute;
