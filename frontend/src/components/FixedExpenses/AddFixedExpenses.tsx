import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, FormControl, Grid } from "@mui/material";
import { FormInput } from "components/FormGroup";
import { v4 as uuidv4 } from "uuid";

export interface CostType {
  id?: string;
  name: string;
  description: string;
  price: number;
}

export interface AddFixedExpensesProps {
  onCostsUpdate: (newCosts: CostType[]) => void;
}

const AddFixedExpenses: React.FC<AddFixedExpensesProps> = ({
  onCostsUpdate,
}) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
    price: Yup.number()
      .typeError("Deve ser um número")
      .required("Campo obrigatório")
      .positive("Deve ser um valor positivo"),
  });

  const [costs, setCosts] = React.useState<CostType[]>([]);

  const handleSubmit = (values: CostType) => {
    const newItem = { ...values, id: uuidv4() };

    setCosts((prevCosts) => [...prevCosts, newItem]);
    onCostsUpdate([...costs, newItem]);
  };

  return (
    <Formik
      initialValues={{
        nameExpense: "",
        name: "",
        description: "",
        date: "",
        price: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <Grid style={{ width: "50%" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FormControl fullWidth>
                <FormInput name="name" label="Despesa" type="text" />
                <Grid
                  sx={{ display: "flex", flexDirection: "row", gap: "20px" }}
                >
                  <FormInput name="description" label="Descrição" type="text" />
                  <FormInput name="price" label="Valor" type="number" />
                  <Button type="submit" variant="contained">
                    Salvar gasto
                  </Button>
                </Grid>
              </FormControl>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default AddFixedExpenses;
