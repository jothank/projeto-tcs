import * as Yup from "yup";

export const ResaleItemValidation = Yup.object().shape({
  name: Yup.string()
    .min(3, `O Produto deve ter no minino 3 caracteres`)
    .required("Este campo é obrigatório"),
  description: Yup.string()
    .min(3, "A descrição deve conter no minimo 3 caracteres")
    .max(20, "A descição não deve passar de 20 caracteres")
    .required("Este campo é obrigatório"),
  purchase_price: Yup.number().required("Este campo é obrigatório"),
});
