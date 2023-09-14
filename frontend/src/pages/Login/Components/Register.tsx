import { Button, Link, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { RegisterIUser } from "types/user.type";
import { RegisterValidation } from "utils/validationForm";
import { register } from "services/auth.service";
import { ButtonForms, ContainerForms, FormInput } from "components/FormGroup";
import { showAlert } from "components/ModalAlert/showModal";

const RegisterValues: RegisterIUser = {
  username: "",
  email: "",
  password1: "",
  password2: "",
  firstName: "",
  lastName: "",
};

const Register: React.FC = () => {
  const handleRegister = async (
    formValue: RegisterIUser,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await register(
        formValue.username,
        formValue.email,
        formValue.password1,
        formValue.password2,
        formValue.firstName,
        formValue.lastName
      );
      showAlert({
        title: "Usuário cadastrado com sucesso!",
        text: "Verifique seu email para ativar sua conta.",
        icon: "success",
        confirmButtonText: "OK",
      });

      resetForm();
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
    <ContainerForms sizeForm="600px" titleForm="Cadastro">
      <Formik
        initialValues={RegisterValues}
        validationSchema={RegisterValidation}
        onSubmit={handleRegister}
      >
        <Form>
          <Stack spacing={1} direction={{ xs: "column", sm: "row" }}>
            <FormInput name="firstName" label="Primeiro Nome" type="text" />
            <FormInput name="lastName" label="Último nome" type="text" />
          </Stack>
          <FormInput name="username" label="Nome de usuário" type="text" />
          <FormInput name="email" label="Email" type="email" />
          <FormInput name="password1" label="Senha" type="password" />
          <FormInput
            name="password2"
            label="Confirme a senha"
            type="password"
          />
          <ButtonForms>
            <Button variant="contained" type="submit" sx={{ width: "50%" }}>
              Cadastrar
            </Button>
            <Link href="/login" underline="hover" variant="subtitle2">
              Já possui tem uma conta?
            </Link>
          </ButtonForms>
        </Form>
      </Formik>
    </ContainerForms>
  );
};

export default Register;
