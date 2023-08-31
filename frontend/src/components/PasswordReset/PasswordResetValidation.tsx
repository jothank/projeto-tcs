import * as Yup from "yup";

export const PasswordResetValidation = Yup.object({
  email: Yup.string()
    .email("This is not a valid email.")
    .required("This field is required!"),
});
