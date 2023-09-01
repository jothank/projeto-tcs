import React from "react";
import Swal from "sweetalert2";
import { Formik, Form } from "formik";
import { login } from "services/auth.service";
import { LoginIUser } from "types/user.type";
import LoginInput from "components/Login/LoginInput";
import { validationLogin } from "utils/validationForm";
import { LoginValues } from "components/Login/LoginValues";

const Login: React.FC = () => {
  const handleLogin = async (values: LoginIUser) => {
    const { username, password } = values;

    try {
      await login(username, password);
      // REMOVER O Swal.fire APÓS IMPLEMENTAR O REDIRECT
      Swal.fire({
        title: "Login Success",
        text: "Login realizado com sucesso.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error: any) {
      const errorMessage = error.message.includes("E-mail is not verified")
        ? "E-mail precisa ser verificado."
        : "Usuário ou senha incorreto.";
      Swal.fire({
        title: "Login Error",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Formik
          initialValues={LoginValues}
          validationSchema={validationLogin}
          onSubmit={handleLogin}
        >
          <Form>
            <div>
              <LoginInput name="username" label="Username" type="text" />
              <LoginInput name="password" label="Password" type="password" />
              <button type="submit" className="btn btn-primary btn-block">
                Sign Up
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
