import React from "react";
import Swal from "sweetalert2";
import { Formik, Form } from "formik";
import { confirmPasswordReset } from "services/auth.service";
import { ConfirmPasswordResetIUser } from "types/user.type";
import { ConfirmPasswordResetValidation } from "utils/validationForm";
import FormInput from "components/FormGroup/FormInput";
import FormContainer from "components/FormGroup/FormContainer";
import { Button, Grid } from "@mui/material";

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
      Swal.fire({
        title: "Password reset Success",
        text: "Email enviado com sucesso.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <FormContainer sizeForm="400px" titleForm="Redefinição de senha">
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
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Button variant="contained" type="submit" sx={{ width: "50%" }}>
              Redefinir senha
            </Button>
          </Grid>
        </Form>
      </Formik>
    </FormContainer>
  );
};

export default ConfirmPasswordReset;
