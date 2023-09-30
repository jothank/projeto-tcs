import { Button, Grid, Link, Divider } from "@mui/material";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { login } from "services/auth.service";
import { LoginIUser } from "types/user.type";
import { validationLogin } from "utils/validations/validationForm";
import { FormInput, ContainerForms, ButtonForms } from "components/FormGroup";
import PasswordResetModal from "pages/Login/Components/PasswordReset";
import { getErro } from "utils/ModalAlert";
import gastro from "../../assets/gastro.png"
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
    <Grid container spacing={2}
    sx={{
      display: 'flex',
      flexDirection: 'row'
    }}
    >
      <Grid item xs={6}>
        <img src={gastro} style={{ width: '100%', height: '100%' }}></img>
      </Grid>
      <Grid item xs={6}>
    <ContainerForms sizeForm="400px" titleForm="Entrar">
      <Divider />
      <Formik
        initialValues={LoginValues}
        validationSchema={validationLogin}
        onSubmit={handleLogin}
      >
        <Form>
          <FormInput name="username" label="Username" type="text" />
          <FormInput name="password" label="Password" type="password" />
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
    </Grid>
    </Grid>
  );
};

export default Login;
