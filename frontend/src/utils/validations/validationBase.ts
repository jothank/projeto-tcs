import * as Yup from "yup";

export const emailSchema = Yup.string()
  .matches(
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    "Este não é um email válido."
  )
  .required("Este campo é obrigatório!");
