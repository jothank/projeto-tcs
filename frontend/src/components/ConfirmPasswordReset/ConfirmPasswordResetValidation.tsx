import * as Yup from "yup";

export const ConfirmPasswordResetValidation = Yup.object({
  newPassword1: Yup.string()
    .min(6, "The password must be at least 6 characters.")
    .max(40, "The password must not exceed 40 characters.")
    .required("This field is required!"),
  newPassword2: Yup.string()
    .oneOf([Yup.ref("newPassword1"), ""], "Passwords must match")
    .required("This field is required!"),
});
