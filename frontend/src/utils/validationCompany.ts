import * as Yup from "yup";
import { emailSchema } from "./validationForm";

export const RegisterValidation = Yup.object().shape({
  name: Yup.string()
    .min(3, `O nome deve ter pelo menos 3 caracteres.`)
    .max(20, `O nome não deve exceder 20 caracteres.`)
    .required("Este campo é obrigatório!"),
  email: emailSchema,
});
