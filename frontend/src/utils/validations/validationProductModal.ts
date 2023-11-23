import * as Yup from "yup";
import { noMoreThanTwoSpaces } from "./validationBase";

export const productValidationSchema = Yup.object().shape({
  productRegistrationName: Yup.string().required(
    "Nome é obrigatório"
  ).test('no-more-than-two-spaces', `O Produto não deve conter mais de dois espaços.`, value => noMoreThanTwoSpaces(value)).min(3, `O Produto deve ter no minimo 3 caracteres`),
  products: Yup.array().of(
    Yup.object().shape({
      feedstock: Yup.object()
        .shape({
          id: Yup.string().required("Insumo é obrigatório"),
        })
        .required("Feedstock is required"),
      quantity: Yup.number().required("Quantidade é obrigatória").moreThan(0, "Quantidade deve ser maior que 0"),
      unit: Yup.string().required("Unidade é obrigatória"),
    })
  ),
});