import * as Yup from "yup";

export const PricingValidation = Yup.object().shape({
    tax: Yup.number().required("Este campo é obrigatório").moreThan(0, "O preço deve ser maior que 0"),
    card_tax: Yup.number().required("Este campo é obrigatório").moreThan(0, "O preço deve ser maior que 0"),
    profit: Yup.number().required("Este campo é obrigatório").moreThan(0, "O preço deve ser maior que 0"),
    suggested_price: Yup.number().required("Este campo é obrigatório"),
    condominium: Yup.number().required("Este campo é obrigatório").moreThan(0, "O preço deve ser maior que 0"),
})