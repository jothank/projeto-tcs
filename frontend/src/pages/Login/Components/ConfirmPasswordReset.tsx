import React from "react";
import { Formik, Form } from "formik";
import { confirmPasswordReset } from "services/auth.service";
import { ConfirmPasswordResetIUser } from "types/user.type";
import { ConfirmPasswordResetValidation } from "utils/validationForm";
import { ContainerForms, FormInput, ButtonForms } from "components/FormGroup";
import { Button } from "@mui/material";
import { showAlert } from "components/ModalAlert/showModal";

const ConfirmPasswordReset: React.FC = () => {
  const currentURL = window.location.href;

  const ConfirmPasswordResetValues: ConfirmPasswordResetIUser = {
    url: "",
    newPassword1: "",
    newPassword2: "",
  };

  const handleLogin = async (values: ConfirmPasswordResetIUser) => {
    const { newPassword1, newPassword2 } = values;

    try {
      await confirmPasswordReset(currentURL, newPassword1, newPassword2);
      showAlert({
        title: "Sucesso!",
        text: "Senha alterada.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error: any) {
      showAlert({
        title: "Erro!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <ContainerForms sizeForm="400px" titleForm="Redefinição de senha">
      <Formik
        initialValues={ConfirmPasswordResetValues}
        validationSchema={ConfirmPasswordResetValidation}
        onSubmit={handleLogin}
      >
        <Form>
          <FormInput name="newPassword1" label="Nova senha" type="password" />
          <FormInput
            name="newPassword2"
            label="Confirme a senha"
            type="password"
          />
          <ButtonForms>
            <Button variant="contained" type="submit" sx={{ width: "50%" }}>
              Redefinir senha
            </Button>
          </ButtonForms>
        </Form>
      </Formik>
    </ContainerForms>
  );
};

export default ConfirmPasswordReset;
