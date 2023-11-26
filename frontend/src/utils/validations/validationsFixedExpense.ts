import * as Yup from "yup";
import { noMoreThanTwoSpaces } from "./validationBase";

export const validationSchema = Yup.object({
  name: Yup.string().required("Campo obrigatório").test('no-more-than-two-spaces', `O Produto não deve conter mais de dois espaços.`, value => noMoreThanTwoSpaces(value)),
  date: Yup.date().required("Campo obrigatório"),
  manualEntry: Yup.boolean(),
  manualValue: Yup.number()
    .typeError("Deve ser um número")
    .when("manualEntry", {
      is: true,
      then: (schema) =>
        schema
          .required("Campo obrigatório")
          .positive("Deve ser um valor positivo"),
      otherwise: (schema) => schema.notRequired(),
    }),
});