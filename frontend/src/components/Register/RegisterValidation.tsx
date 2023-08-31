import * as Yup from "yup";

export const RegisterValidation = Yup.object().shape({
  username: Yup.string()
    .min(3, "The username must be at least 3 characters.")
    .max(20, "The username must not exceed 20 characters.")
    .required("This field is required!"),
  email: Yup.string()
    .email("This is not a valid email.")
    .required("This field is required!"),
  password1: Yup.string()
    .min(6, "The password must be at least 6 characters.")
    .max(40, "The password must not exceed 40 characters.")
    .required("This field is required!"),
  password2: Yup.string()
    .oneOf([Yup.ref("password1"), ""], "Passwords must match")
    .required("This field is required!"),
  firstName: Yup.string()
    .min(3, "The first name must be at least 3 characters.")
    .max(20, "The first name must not exceed 20 characters.")
    .required("This field is required!"),
  lastName: Yup.string()
    .min(3, "The last name must be at least 3 characters.")
    .max(20, "The last name must not exceed 20 characters.")
    .required("This field is required!"),
});
