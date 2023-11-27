import * as Yup from "yup";
import { emailSchema } from "./validationBase";

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.\\])[A-Za-z\d@$!%*#?&.\\]{8,}$/;

export const passwordSchema = Yup.string()
  .test(
    "password",
    "A senha deve ter pelo menos 8 caracteres, incluir pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@$!%*#?&.).",
    (value: any) => passwordRegex.test(value)
  )
  .required("Este campo é obrigatório!");

export const usernameSchema = Yup.string()
  .min(3, "O nome de usuário deve ter pelo menos 3 caracteres.")
  .max(20, "O nome de usuário não deve exceder 20 caracteres.")
  .trim()
  .required("Este campo é obrigatório!");


const nameSchema = (name: string) =>
  Yup.string()
    .min(3, `O ${name} deve ter pelo menos 3 caracteres.`)
    .max(20, `O ${name} não deve exceder 20 caracteres.`)
    .trim()
    .required("Este campo é obrigatório!");

export const ConfirmPasswordResetValidation = Yup.object({
  newPassword1: passwordSchema,
  newPassword2: Yup.string()
    .oneOf([Yup.ref("newPassword1"), ""], "As senhas devem ser iguais.")
    .required("Este campo é obrigatório!"),
});

export const validationLogin = Yup.object({
  username: usernameSchema,
  password: passwordSchema,
});

export const PasswordResetValidation = Yup.object({
  email: emailSchema,
});

export const RegisterValidation = Yup.object().shape({
  username: usernameSchema,
  email: emailSchema,
  password1: passwordSchema,
  password2: Yup.string()
    .oneOf([Yup.ref("password1"), ""], "As senhas devem ser iguais.")
    .required("Este campo é obrigatório!"),
  firstName: nameSchema("nome"),
  lastName: nameSchema("sobrenome"),
});

export const ConfirmEmailValidation = Yup.object({
  email: emailSchema,
});
