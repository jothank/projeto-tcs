import * as Yup from "yup";

export const productValidationSchema = Yup.object().shape({
  productRegistrationName: Yup.string().required(
    "Nome é obrigatório"
  ),
  products: Yup.array().of(
    Yup.object().shape({
      feedstock: Yup.object()
        .shape({
          id: Yup.string().required("Insumo é obrigatório"),
        })
        .required("Feedstock is required"),
      quantity: Yup.number().required("Quantidade é obrigatória"),
      unit: Yup.string().required("Unidade é obrigatória"),
    })
  ),
});