import { Button, Link } from "@mui/material";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { login } from "services/auth.service";
import { LoginIUser } from "types/user.type";
import { validationLogin } from "utils/validationForm";
import FormInput from "components/FormGroup/FormInput";
import FormContainer from "components/FormGroup/FormContainer";
import FormButton from "components/FormGroup/FormButton";
import PasswordResetModal from "pages/Login/Components/PasswordReset";

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
      console.log(error.message);
    }
  };

  return (
    <FormContainer sizeForm="400px" titleForm="Entrar">
      <Formik
        initialValues={LoginValues}
        validationSchema={validationLogin}
        onSubmit={handleLogin}
      >
        <Form>
          <FormInput name="username" label="Username" type="text" />
          <FormInput name="password" label="Password" type="password" />
          <FormButton>
            <Button variant="contained" type="submit" sx={{ width: "50%" }}>
              Acessar
            </Button>
            <Link href="/" underline="hover" variant="subtitle2">
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
          </FormButton>
        </Form>
      </Formik>
    </FormContainer>
  );
};

export default Login;
