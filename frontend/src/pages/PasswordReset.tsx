import React from "react";
import Swal from "sweetalert2";
import { Formik, Form } from "formik";
import { passwordReset } from "../services/auth.service";
import { PasswordResetIUser } from "../types/user.type";
import PasswordResetInput from "../components/PasswordReset/PasswordResetInput";
import { PasswordResetValidation } from "../components/PasswordReset/PasswordResetValidation";
import { PasswordResetValues } from "../components/PasswordReset/PasswordResetValues";

const PasswordReset: React.FC = () => {
  const handleLogin = async (values: PasswordResetIUser) => {
    const { email } = values;

    try {
      await passwordReset(email);
      // REMOVER O Swal.fire APÓS IMPLEMENTAR O REDIRECT
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

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Formik
          initialValues={PasswordResetValues}
          validationSchema={PasswordResetValidation}
          onSubmit={handleLogin}
        >
          <Form>
            <div>
              <PasswordResetInput name="email" label="email" type="email" />
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

export default PasswordReset;
