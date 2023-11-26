import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import UnitSelect from "components/SelectOptions/SelectOptions";
import { options } from "utils/FeedstockUnit";
import { FeedstockType } from "types/Feedstock.type";
import { ProductInput } from "./InputProduct";
import { updateSupply } from "services/supply.service";

export interface Product {
  feedstock: {
    [x: string]: any;
    id?: number;
    name: string;
    price: number;
    unit: string;
  };
  id: number;
  price: number;
  quantity: number;
  unit: string;
}

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  selectedSupply: any;
  feedstockList: FeedstockType[];
}

const EditDialog: React.FC<EditDialogProps> = ({
  open,
  onClose,
  selectedSupply,
  feedstockList,
}) => {
  const validationSchema = Yup.object({
    unit: Yup.string().required("Unidade é obrigatório"),
    feedstock: Yup.object({
      id: Yup.number().moreThan(0, "Insumo é obrigatório"),
      name: Yup.string().required("Nome do insumo é obrigatório"),      
    }).required("Insumo é obrigatório"),
    quantity: Yup.number().required("Quantidade é obrigatório").moreThan(0, "O preço deve ser maior que 0").transform((value, originalValue) => typeof originalValue === "string" ? parseFloat(originalValue.replace(/[^0-9.,]/g, "").replace(",", ".")) : value),
  });

  const handleEdit = async (values: Product) => {
    try {
      console.log(values);
      const edit = await updateSupply(
        values.id,
        values.feedstock.id || 0,
        values.quantity,
        values.unit
      );
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
  }, [selectedSupply]);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Editar Item</DialogTitle>
        <Formik
          initialValues={selectedSupply}
          validationSchema={validationSchema}
          onSubmit={handleEdit}
          enableReinitialize
        >
          {({ setFieldValue }) => (
            <Form>
              <DialogContent>
                <ProductInput
                  type="number"
                  name="quantity"
                  label="Quantidade"
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel htmlFor="feedstock">Matéria-prima</InputLabel>
                  <Field
                    as={Select}
                    name="feedstock.id"
                    label="Matéria-prima"
                    fullWidth
                    onChange={(event: { target: { value: any } }) => {
                      const id = event.target.value;
                      const selectedFeedstock = feedstockList.find(
                        (f) => f.id === id
                      );
                      if (selectedFeedstock) {
                        setFieldValue("feedstock", selectedFeedstock);
                      }
                    }}
                  >
                    {feedstockList.map(({ id, name }) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <UnitSelect
                  name="unit"
                  label="Unidade"
                  options={options}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => onClose()} color="primary">
                  Cancelar
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  Salvar
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};
export default EditDialog;
