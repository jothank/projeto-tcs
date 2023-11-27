import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string().required("Campo obrigatório").trim(),
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