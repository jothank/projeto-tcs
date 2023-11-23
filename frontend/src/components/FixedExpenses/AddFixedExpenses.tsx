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
import { FixedExpenseType } from "./FixedExpensesView";
import { FormInputDate } from "./FixedExpenseInput";

export interface AddFixedExpensesProps {
  onFixedExpensesUpdate: (newFixedExpenses: FixedExpenseType) => void;
  fixedExpenses: FixedExpenseType;
  open: boolean;
  onClose: () => void;
}

const ModalAddFixedExpenses: React.FC<AddFixedExpensesProps> = ({
  onFixedExpensesUpdate,
  fixedExpenses,
  open,
  onClose,
}) => {
  const validationSchema = Yup.object().shape({
    date: Yup.date().required("Campo obrigatório"),
    total_price: Yup.number()
      .typeError("Deve ser um número")
      .required("Campo obrigatório")
      .positive("Deve ser um valor positivo"),
  });

  const handleSubmit = (values: FixedExpenseType) => {
    onFixedExpensesUpdate(values);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Adicionar Despesa</DialogTitle>
        <Formik
          initialValues={{
            id: fixedExpenses.id,
            name: fixedExpenses.name,
            costs: fixedExpenses.costs,
            type: fixedExpenses.type,
            description: fixedExpenses.description || "",
            date: fixedExpenses.date,
            total_price: fixedExpenses.total_price,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <DialogContent>
                <FormControl fullWidth>
                  <FormInput name="description" label="Descrição" type="text" />
                  <FormInputDate name="date" label="data" type="date" />
                  <FormInput name="total_price" label="Valor" type="number" />
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button type="submit" variant="contained">
                  Salvar Gasto
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default ModalAddFixedExpenses;
