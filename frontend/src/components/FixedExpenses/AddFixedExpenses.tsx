import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, FormControl, Grid } from "@mui/material";
import { FormInput } from "components/FormGroup";
import UnitSelect from "components/SelectOptions/SelectOptions";
import { optionsMonth } from "utils/FixedExpenseMonth";
export interface CostType {
  id?: number;
  nameExpense: string;
  name: string;
  description: string;
  date: string;
  price: number;
}

export interface AddFixedExpensesProps {
  onCostsUpdate: (newCosts: CostType[]) => void;
}

const AddFixedExpenses: React.FC<AddFixedExpensesProps> = ({
  onCostsUpdate,
}) => {
  const validationSchema = Yup.object().shape({
    nameExpense: Yup.string().required("Campo obrigatório"),
    name: Yup.string().required("Campo obrigatório"),
    date: Yup.string().required("Campo obrigatório"),
    price: Yup.number()
      .typeError("Deve ser um número")
      .required("Campo obrigatório")
      .positive("Deve ser um valor positivo"),
  });

  const [costs, setCosts] = React.useState<CostType[]>([]);
  
  const handleSubmit = (values: CostType) => {
    const newCosts = [...costs, values];
    setCosts(newCosts);
    onCostsUpdate(newCosts);
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
          <Grid style={{ 
           width: "100%",
           }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "20px"
              }}
            >
              <FormControl fullWidth>
                <UnitSelect
                name="name"
               label="Mês"
               options={optionsMonth}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormInput name="nameExpense" label="Despesa" type="text" />
              </FormControl>
              <FormControl fullWidth>
                <FormInput type="text" name="date" label="Data" />
              </FormControl>
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
              <FormControl fullWidth>
                <FormInput name="description" label="Descrição" type="text" />
              </FormControl>
              <FormControl fullWidth>
                <FormInput name="price" label="Valor" type="number" />
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "30%" }}
              >
                Salvar
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default AddFixedExpenses;
