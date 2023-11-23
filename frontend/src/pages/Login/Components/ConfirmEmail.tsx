import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Link, Button } from "@mui/material";
import { confirmEmail, getResendEmail } from "services/auth.service";
import { ConfirmEmailIUser } from "types/user.type";
import { getErro, getSuccess } from "utils/ModalAlert";

import {
  ContainerForms,
  FormInput,
  ButtonForms,
  TitleForms,
} from "components/FormGroup";

import { ConfirmEmailValidation } from "utils/validations/validationForm";

const ConfirmEmailValues: ConfirmEmailIUser = {
  email: "",
  url: "",
};

const ConfirmEmail: React.FC = () => {
  const currentURL = window.location.href;
  const [hasError, setHasError] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const handleConfirmation = async () => {
    try {
      await confirmEmail(currentURL);
    } catch (error: any) {
      setHasError(true);
    }
  };

  const resendEmail = async (values: ConfirmEmailIUser) => {
    try {
      if (values.email) await getResendEmail(values.email);
      setHasError(false);
      setEmailSent(true);
      getSuccess("Email reenviado com sucesso!");
    } catch (error: any) {
      getErro("Erro ao reenviar o email. Tente novamente mais tarde.");
    }
  };

  useEffect(() => {
    handleConfirmation();
  });

  return (
    <ContainerForms sizeForm="500px" titleForm="Confirmação de E-mail">
      {hasError ? (
        <Formik
          initialValues={ConfirmEmailValues}
          validationSchema={ConfirmEmailValidation}
          onSubmit={resendEmail}
        >
          {() => (
            <Form>
              <TitleForms>
                <p>
                  Ocorreu um erro ao verificar seu e-mail. Gostaria de tentar
                  enviar novamente?
                </p>
              </TitleForms>
              <FormInput name="email" label="Email" type="email" />
              <ButtonForms>
                <Button variant="contained" type="submit" sx={{ width: "50%" }}>
                  Reenviar Email
                </Button>
              </ButtonForms>
            </Form>
          )}
        </Formik>
      ) : emailSent ? (
        <>
          <TitleForms>
            <p>
              Email enviado com sucesso, verifique sua caixa de email ou spam
            </p>
          </TitleForms>
        </>
      ) : (
        <>
          <TitleForms>
            <h2>Obrigado por verificar sua conta</h2>
          </TitleForms>
          <ButtonForms>
            <Link href="/" underline="hover" variant="subtitle2">
              Deseja acessar o sistema?
            </Link>
          </ButtonForms>
        </>
      )}
    </ContainerForms>
  );
};

export default ConfirmEmail;
