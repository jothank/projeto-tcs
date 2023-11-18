import React from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { FormInput } from "components/FormGroup";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export interface CostType {
  id?: string;
  name: string;
  description: string;
  price: number;
}

export interface AddFixedExpensesProps {
  open: boolean;
  onClose: () => void;
  onCostsUpdate: (newCosts: CostType[]) => void;
}

const validationSchema = Yup.object().shape({
  costs: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Campo obrigatório"),
        description: Yup.string(),
        price: Yup.number()
          .typeError("Deve ser um número")
          .required("Campo obrigatório")
          .positive("Deve ser um valor positivo"),
      })
    )
    .required("É necessário pelo menos um custo"),
});

const AddFixedExpenses: React.FC<AddFixedExpensesProps> = ({
  onCostsUpdate,
  open,
  onClose,
}) => {
  const initialValues = {
    costs: [{ name: "", description: "", price: 0 }],
  };

  interface FormValues {
    costs: CostType[];
  }

  const handleSubmit = (values: FormValues) => {
    const newCosts = values.costs.map((cost: CostType) => ({
      ...cost,
      id: uuidv4(),
    }));
    onCostsUpdate(newCosts);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Adicionar itens</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <FieldArray name="costs">
                {({ remove, push }) => (
                  <div>
                    {values.costs.length > 0 &&
                      values.costs.map((cost, index) => (
                        <div key={index}>
                          <FormControl fullWidth>
                            <FormInput
                              name={`costs.${index}.name`}
                              label="Despesa"
                              type="text"
                            />
                            <FormInput
                              name={`costs.${index}.description`}
                              label="Descrição"
                              type="text"
                            />
                            <FormInput
                              name={`costs.${index}.price`}
                              label="Valor"
                              type="number"
                            />
                            <IconButton onClick={() => remove(index)}>
                              <RemoveIcon sx={{ color: "red" }} />
                            </IconButton>
                          </FormControl>
                        </div>
                      ))}
                    <IconButton
                      type="button"
                      onClick={() =>
                        push({ name: "", description: "", price: 0 })
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                )}
              </FieldArray>
              <DialogActions>
                <Button onClick={onClose} color="primary">
                  Cancelar
                </Button>
                <Button variant="contained" type="submit" color="primary">
                  Salvar
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddFixedExpenses;
