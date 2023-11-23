import * as Yup from "yup";
import { noMoreThanTwoSpaces } from "./validationBase";

export const FeedstockValidation = Yup.object().shape({
  name: Yup.string()
    .min(3, `O Produto deve ter no minimo 3 caracteres`)
    .test('no-more-than-two-spaces', `O Produto não deve conter mais de dois espaços.`, value => noMoreThanTwoSpaces(value))
    .required("Este campo é obrigatório"),
  price: Yup
    .number()
    .transform((value, originalValue) => typeof originalValue === "string" ? parseFloat(originalValue.replace(/[^0-9.,]/g, "").replace(",", ".")) : value)
    .required("O preço é obrigatório")
    .moreThan(0, "O preço deve ser maior que 0"),
  quantity: Yup.number().required("Este campo é obrigatório.").moreThan(0, "O preço deve ser maior que 0"),
  unit: Yup.string().required("Este campo é obrigatório."),
  type: Yup.string().required("Este campo é obrigatório."),
});
