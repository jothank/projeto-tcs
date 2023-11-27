import * as Yup from "yup";

export const productValidationSchema = Yup.object().shape({
  productRegistrationName: Yup.string().required(
    "Nome é obrigatório"
  ).trim().min(3, `O Produto deve ter no minimo 3 caracteres`),
  products: Yup.array().of(
    Yup.object().shape({
      feedstock: Yup.object()
        .shape({
          id: Yup.string().required("Insumo é obrigatório"),
        })
        .required("Feedstock is required"),
      quantity: Yup.number().required("Quantidade é obrigatória").moreThan(0, "Quantidade deve ser maior que 0").transform((value, originalValue) => typeof originalValue === "string" ? parseFloat(originalValue.replace(/[^0-9.,]/g, "").replace(",", ".")) : value),
      unit: Yup.string().required("Unidade é obrigatória"),
    })
  ),
});