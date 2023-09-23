import * as Yup from "yup";

export const FeedstockValidation = Yup.object().shape({
  name: Yup.string()
    .min(3, `O Produto deve ter no minimo 3 caracteres`)
    .required("Este campo é obrigatório"),
  price: Yup.number().required("Este campo é obrigatório."),
  quantity: Yup.number().required("Este campo é obrigatório."),
  unit: Yup.string().required("Este campo é obrigatório."),
});
