import * as Yup from "yup";

export const FixedExpenseValidation = Yup.object().shape({
    name: Yup.string()
    .min(3, `O nome deve ter no minimo 3 caracteres`)
    .required("Este campo é obrigatório"),
    description: Yup.string(),
    price: Yup.number().required("Este campo é obrigatório."),
    date: Yup.string().required("Este campo é obrigatório."),
    total_price:  Yup.number().required("Este campo é obrigatório."),
});