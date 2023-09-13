import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { confirmEmail } from "services/auth.service";
import { ConfirmEmailIUser } from "types/user.type";
import FormContainer from "components/FormGroup/FormContainer";

const ConfirmEmail: React.FC = () => {
  const currentURL = window.location.href;

  const ConfirmEmailValues: ConfirmEmailIUser = {
    url: "",
  };

  const handleLogin = async (values: ConfirmEmailIUser) => {
    const {} = values;

    try {
      await confirmEmail(currentURL);
      Swal.fire({
        title: "Password reset Success",
        text: "Email enviado com sucesso.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLogin(ConfirmEmailValues);
  }, []);

  return (
    <FormContainer sizeForm="400px" titleForm="Confirmando email">
      <h1>Obrigado por verificar sua conta</h1>
    </FormContainer>
  );
};

export default ConfirmEmail;
