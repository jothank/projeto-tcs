import { Formik, Form } from "formik";
import { ProductInput } from "components/Product/InputProduct";
import { FeedstockType } from "types/Feedstock.type";
import ProductArrayField from "./ProductArrayField";
import { productValidationSchema } from "utils/validations/validationProductModal";
import { Button, DialogActions } from "@mui/material";

interface ProductFormProps {
  feedstockList: FeedstockType[];
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const initialValues = {
  productRegistrationName: "",
  products: [{ feedstock: { id: "" }, quantity: "", unit: "", price: 0 }],
};

const ProductForm: React.FC<ProductFormProps> = ({
  feedstockList,
  onSubmit,
  onCancel,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={productValidationSchema}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <ProductInput
            name="productRegistrationName"
            label="Nome do produto"
            type="text"
          />
          <ProductArrayField
            values={values}
            feedstockList={feedstockList}
            setFieldValue={setFieldValue}
          />
          <DialogActions>
            <Button onClick={onCancel} color="primary">
              Cancelar
            </Button>
            <Button variant="contained" type="submit" color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
