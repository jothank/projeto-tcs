import * as Yup from "yup";
import { emailSchema } from "./validationBase";

export const CompanyValidation = Yup.object().shape({
  name: Yup.string()
    .min(3, `O nome deve ter pelo menos 3 caracteres.`)
    .max(20, `O nome não deve exceder 20 caracteres.`)
    .required("Este campo é obrigatório!"),
  email: emailSchema,
  cnpj: Yup.string()
    .length(18, `O CNPJ deve ser válido.`)
    .required("Este campo é obrigatório!"),
  phone: Yup.string()
    .min(8, `O telefone deve ser válido.`)
    .max(17, `O telefone deve ser válido.`)
    .required("Este campo é obrigatório!"),
  street: Yup.string()
    .min(3, `A rua deve ter pelo menos 3 caracteres.`)
    .required("Este campo é obrigatório!"),
  number: Yup.string()
    .min(1, `O número deve ter pelo menos 1 caracteres.`)
    .required("Este campo é obrigatório!"),
  neighborhood: Yup.string()
    .min(3, `O bairro deve ter pelo menos 3 caracteres.`)
    .required("Este campo é obrigatório!"),
  city: Yup.string()
    .min(3, `A cidade deve ter pelo menos 3 caracteres.`)
    .required("Este campo é obrigatório!"),
  state: Yup.string()
    .min(2, `O estado deve ter pelo menos 2 caracteres.`)
    .required("Este campo é obrigatório!"),
  country: Yup.string()
    .min(3, `O país deve ter pelo menos 3 caracteres.`)
    .required("Este campo é obrigatório!"),
  zipcode: Yup.string()
    .min(8, `O CEP deve ter pelo menos 8 caracteres.`)
    .required("Este campo é obrigatório!"),
});
