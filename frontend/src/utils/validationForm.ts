import * as Yup from "yup";

const passwordSchema = Yup.string()
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
  )
  .required("This field is required!");

const commonValidation = {
  username: Yup.string().required("Username is required!"),
  password: passwordSchema,
};

export const ConfirmPasswordResetValidation = Yup.object({
  newPassword1: passwordSchema,
  newPassword2: Yup.string()
    .oneOf([Yup.ref("newPassword1"), ""], "Passwords must match")
    .required("This field is required!"),
});

export const validationLogin = Yup.object(commonValidation);

export const PasswordResetValidation = Yup.object({
  email: Yup.string()
    .email("This is not a valid email.")
    .required("This field is required!"),
});

export const RegisterValidation = Yup.object().shape({
  username: Yup.string()
    .min(3, "The username must be at least 3 characters.")
    .max(20, "The username must not exceed 20 characters.")
    .required("This field is required!"),
  email: Yup.string()
    .email("This is not a valid email.")
    .required("This field is required!"),
  password1: passwordSchema,
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
