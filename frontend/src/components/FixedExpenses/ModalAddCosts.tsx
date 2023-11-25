import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { FormInput } from "components/FormGroup";
import { v4 as uuidv4 } from "uuid";

export interface CostType {
  id?: string;
  name: string;
  description: string;
  price: number;
}

export interface AddFixedExpensesProps {
  onCostsUpdate: (newCosts: CostType) => void;
}

const ModalAddCosts: React.FC<AddFixedExpensesProps> = ({ onCostsUpdate }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
    price: Yup.number()
      .typeError("Deve ser um número")
      .required("Campo obrigatório")
      .positive("Deve ser um valor positivo"),
  });

  const [costs, setCosts] = React.useState<CostType[]>([]);

  const handleSubmit = (
    values: CostType,
    { resetForm }: { resetForm: () => void }
  ) => {
    const newItem = { ...values, id: uuidv4() };
    setCosts((prevCosts) => [...prevCosts, newItem]);
    onCostsUpdate(newItem);
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen} >
        Adicionar Gasto Fixo
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adicionar Despesa</DialogTitle>
        <Formik
          initialValues={{
            name: "",
            description: "",
            price: 0,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <DialogContent>
                <FormControl fullWidth>
                  <FormInput name="name" label="Despesa" type="text" />
                  <FormInput name="description" label="Descrição" type="text" />
                  <FormInput name="price" label="Valor" type="number" />
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit" variant="contained">
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

export default ModalAddCosts;
