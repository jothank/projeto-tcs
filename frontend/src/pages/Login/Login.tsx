import { Button, Link } from "@mui/material";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { login } from "services/auth.service";
import { LoginIUser } from "types/user.type";
import { validationLogin } from "utils/validations/validationForm";
import { FormInput, ContainerForms, ButtonForms } from "components/FormGroup";
import PasswordResetModal from "pages/Login/Components/PasswordReset";
import { getErro } from "utils/ModalAlert";
import LoginPageStyle from "components/LoginPageStyle/LoginPageStyle";

const LoginValues: LoginIUser = {
  username: "",
  password: "",
};

const Login: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values: typeof LoginValues) => {
    try {
      await login(values.username, values.password);
      navigate("/home");
    } catch (error: any) {
      getErro(error.message);
    }
  };

  return (
    <LoginPageStyle>
    <ContainerForms sizeForm="400px" titleForm="Entrar">
      <Formik
        initialValues={LoginValues}
        validationSchema={validationLogin}
        onSubmit={handleLogin}
      >
        <Form>
          <FormInput name="username" label="Usuário" type="text" />
          <FormInput name="password" label="Senha" type="password" />
          <ButtonForms>
            <Button variant="contained" type="submit" sx={{ width: "50%" }}>
              Acessar
            </Button>
            <Link href="/register" underline="hover" variant="subtitle2">
              Ainda não tem uma conta?
            </Link>
            <Link
              onClick={() => setModalOpen(true)}
              underline="hover"
              variant="subtitle2"
            >
              Esqueceu sua senha?
            </Link>
            <PasswordResetModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
            />
          </ButtonForms>
        </Form>
      </Formik>
    </ContainerForms>
    </LoginPageStyle>
  );
};

export default Login;
