import * as Yup from "yup";

export const PricingValidation = Yup.object().shape({
    tax: Yup.number().required("Este campo é obrigatório"),
    card_tax: Yup.number().required("Este campo é obrigatório"),
    profit: Yup.number().required("Este campo é obrigatório"),
    suggested_price: Yup.number().required("Este campo é obrigatório"),
    condominium: Yup.number().required("Este campo é obrigatório"),
})