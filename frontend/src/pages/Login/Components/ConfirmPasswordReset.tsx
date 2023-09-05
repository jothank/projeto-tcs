import React from "react";
import Swal from "sweetalert2";
import { Formik, Form } from "formik";
import { confirmPasswordReset } from "../../../services/auth.service";
import { ConfirmPasswordResetIUser } from "../../../types/user.type";
import ConfirmPasswordResetInput from "../../../components/ConfirmPasswordReset/ConfirmPasswordResetInput";
// import { ConfirmPasswordResetValidation } from "../../../components/ConfirmPasswordReset/ConfirmPasswordResetValidation";
import { ConfirmPasswordResetValues } from "../../../components/ConfirmPasswordReset/ConfirmPasswordResetValues";


const ConfirmPasswordReset: React.FC = () => {
  const currentURL = window.location.href;

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
      console.log(error);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Formik
          initialValues={ConfirmPasswordResetValues}
          // validationSchema={ConfirmPasswordResetValidation}
          onSubmit={handleLogin}
        >
          <Form>
            <div>
              <ConfirmPasswordResetInput
                name="newPassword1"
                label="newPassword1"
                type="password"
              />
              <ConfirmPasswordResetInput
                name="newPassword2"
                label="newPassword2"
                type="password"
              />
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

export default ConfirmPasswordReset;
