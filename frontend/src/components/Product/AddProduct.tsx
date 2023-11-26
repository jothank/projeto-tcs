import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import * as Yup from "yup";
import { FeedstockType } from "types/Feedstock.type";
import { ProductInput } from "./InputProduct";
import UnitSelect from "components/SelectOptions/SelectOptions";
import { options } from "utils/FeedstockUnit";
import { ProductType } from "types/Product.types";
import { setSupply } from "services/supply.service";
import {
  setProduct,
  updateProduct,
} from "services/product.service";
import { getSuccessWarning } from "utils/ModalAlert";

interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  feedstockList: FeedstockType[];
  selectProduct: any;
}

const validationSchema = Yup.object({
  feedstock: Yup.object({
    id: Yup.number().notOneOf([0], "Insumo é obrigatório"),
  }).required("Insumo é obrigatório"),
  quantity: Yup.number().required("Quantidade é obrigatório").moreThan(0, "O preço deve ser maior que 0").transform((value, originalValue) => typeof originalValue === "string" ? parseFloat(originalValue.replace(/[^0-9.,]/g, "").replace(",", ".")) : value),
  unit: Yup.string().required("Unidade é obrigatório"),
  price: Yup.number().required("Preço é obrigatório"),
});

const initialValues: ProductType = {
  feedstock: {
    id: 0,
    name: "",
    price: 0,
    quantity: 0,
    unit: "",
  },
  quantity: 0,
  unit: "",
  price: 0,
};

const AddProduct: React.FC<ProductFormProps> = ({
  open,
  onClose,
  feedstockList,
  selectProduct,
}) => {
  const handleAddProduct = async (values: ProductType) => {
    try {
      const supply = await setSupply(
        values.feedstock.id || 0,
        values.quantity,
        values.unit
      );
      const ids = selectProduct.supplies.map((item: { id: number }) => item.id);
      ids.push(supply[0].id);
      const updatePrice = selectProduct.price + supply[0].price;

      updateProduct({
        id: selectProduct.id,
        name: selectProduct.name,
        supplies: ids,
        price: updatePrice,
      });
      onClose();
      getSuccessWarning("Produto adicionado com sucesso!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Adicionar item</DialogTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={handleAddProduct}
        validationSchema={validationSchema}
      >
        <Form style={{ padding: "10px" }}>
          <Field
            name="feedstock"
            label="Insumo"
            component={({
              field,
              form: { setFieldValue, setFieldTouched, submitCount },
            }: any) => (
              <FormControl
                fullWidth
                margin="dense"
                error={!!(submitCount > 0 && field.value.id === 0)}
              >
                <InputLabel>Insumo</InputLabel>
                <Select
                  {...field}
                  fullWidth
                  onChange={(e) => {
                    const selectedId = Number(e.target.value);
                    const selectedFeedstock = feedstockList.find(
                      (fs) => fs.id === selectedId
                    );
                    setFieldValue("feedstock", selectedFeedstock ?? "");
                    setFieldTouched("feedstock", true);
                  }}
                  value={field.value?.id || ""}
                >
                  {feedstockList.map((feedstock) => (
                    <MenuItem key={feedstock.id} value={feedstock.id}>
                      {feedstock.name}
                    </MenuItem>
                  ))}
                </Select>
                {submitCount > 0 && (
                  <ErrorMessage
                    name="feedstock.id"
                    component={FormHelperText}
                  />
                )}
              </FormControl>
            )}
          />
          <ProductInput name="quantity" label="Quantidade" type="number" />
          <UnitSelect name="unit" label="Unidade" options={options} />
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancelar
            </Button>
            <Button variant="contained" type="submit" color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default AddProduct;
