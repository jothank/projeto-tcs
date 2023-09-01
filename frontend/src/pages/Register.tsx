import React from "react";
import Swal from "sweetalert2";
import { Formik, Form } from "formik";
import { RegisterIUser } from "types/user.type";
import { register } from "services/auth.service";
import { useNavigate } from "react-router-dom";
import { RegisterValidation } from "utils/validationForm";
import { RegisterInput } from "components/Register/RegisterInput";
import { RegisterValues } from "components/Register/RegisterValues";

const Register: React.FC = () => {
  const history = useNavigate();
  const handleRegister = async (formValue: RegisterIUser) => {
    const { username, email, password1, password2, firstName, lastName } =
      formValue;
    try {
      await register(
        username,
        email,
        password1,
        password2,
        firstName,
        lastName
      );
      Swal.fire({
        title: "Register Success",
        text: "Cadastro realizado com sucesso.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error: any) {
      const errorMessage = error.message.includes(
        "A user with that username already exists."
      )
        ? "Nome de usuário já está em uso."
        : "E-mail já está em uso.";
      Swal.fire({
        title: "Register Error",
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
          initialValues={RegisterValues}
          validationSchema={RegisterValidation}
          onSubmit={handleRegister}
        >
          <Form>
            <div>
              <RegisterInput name="username" label="Username" type="text" />
              <RegisterInput name="email" label="Email" type="email" />
              <RegisterInput
                name="password1"
                label="Password"
                type="password"
              />
              <RegisterInput
                name="password2"
                label="Confirm Password"
                type="password"
              />
              <RegisterInput name="firstName" label="firstName" type="text" />
              <RegisterInput name="lastName" label="lastName" type="text" />

              <button type="submit" className="btn btn-primary btn-block">
                Sign Up
              </button>
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => history("/login")}
              >
                Login
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
