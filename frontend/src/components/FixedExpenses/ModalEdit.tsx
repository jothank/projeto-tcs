import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
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

export interface EditFixedExpensesProps {
  open: boolean;
  cost: CostType | null;
  onClose: () => void;
  onUpdate: (updatedCost: CostType) => void;
}

const EditFixedExpenses: React.FC<EditFixedExpensesProps> = ({
  open,
  cost,
  onClose,
  onUpdate,
}) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório").trim(),
    price: Yup.number()
      .typeError("Deve ser um número")
      .required("Campo obrigatório")
      .positive("Deve ser um valor positivo"),
  });

  const formInitialValues: CostType = {
    id: cost?.id ?? uuidv4(),
    name: cost?.name ?? "",
    description: cost?.description ?? "",
    price: cost?.price ?? 0,
  };

  const handleSubmit = (
    values: CostType,
    actions: { resetForm: () => void }
  ) => {
    onUpdate(values);
    actions.resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {cost ? "Editar Despesa Fixa" : "Adicionar Despesa Fixa"}
      </DialogTitle>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ resetForm }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormInput name="name" label="Despesa" type="text" />
                </Grid>
                <Grid item xs={12}>
                  <FormInput name="description" label="Descrição" type="text" />
                </Grid>
                <Grid item xs={12}>
                  <FormInput name="price" label="Valor" type="number" />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  resetForm();
                  onClose();
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="contained">
                {cost ? "Atualizar" : "Salvar"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditFixedExpenses;
