import * as Yup from "yup";

export const productValidationSchema = Yup.object().shape({
  productRegistrationName: Yup.string().required(
    "Product Registration Name is required"
  ),
  products: Yup.array().of(
    Yup.object().shape({
      feedstock: Yup.object()
        .shape({
          id: Yup.string().required("Feedstock ID is required"),
        })
        .required("Feedstock is required"),
      quantity: Yup.number().required("Quantity is required"),
      unit: Yup.string().required("Unit is required"),
      price: Yup.number().required("Price is required"),
    })
  ),
});