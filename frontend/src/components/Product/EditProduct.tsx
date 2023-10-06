import React from "react";
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
import { FeedstockSelect } from "components/SelectOptions/SelectOptions";
import { options } from "utils/FeedstockUnit";
import { FeedstockType } from "types/Feedstock.type";

export interface Product {
  feedstock: {
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
    feedstock: Yup.object().shape({
      id: Yup.number().required("Matéria-prima é obrigatório"),
    }),
  });

  const handleEdit = async (values: Product) => {
    try {
      console.log(values);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Editar Item</DialogTitle>
        <Formik
          initialValues={selectedSupply}
          validationSchema={validationSchema}
          onSubmit={handleEdit}
        >
          {({ isSubmitting }) => (
            <Form>
              <DialogContent>
                <Field
                  type="number"
                  name="quantity"
                  label="Quantidade"
                  margin="dense"
                  fullWidth
                  as={TextField}
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel htmlFor="feedstock">Matéria-prima</InputLabel>
                  <Field
                    as={Select}
                    name="feedstock.id"
                    label="Matéria-prima"
                    fullWidth
                  >
                    {feedstockList.map(({ id, name }) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <FeedstockSelect
                  name="unit"
                  label="Unidade"
                  options={options}
                  valueUnit={selectedSupply.unit}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => onClose()} color="primary">
                  Cancelar
                </Button>
                <Button type="submit" color="primary" disabled={isSubmitting}>
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
