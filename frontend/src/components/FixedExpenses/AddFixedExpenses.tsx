import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, FormControl, Grid, TextField } from "@mui/material";

export interface ExpenseValueType {
  nameExpense: string;
  name: string;
  description: string;
  date: string;
  price: number;
}

const AddFixedExpenses = ({
  expensesValue,
  setExpenses,
}: {
  expensesValue: ExpenseValueType[];
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseValueType[]>>;
}) => {
  const validationSchema = Yup.object().shape({
    nameExpense: Yup.string().required("Campo obrigatório"),
    name: Yup.string().required("Campo obrigatório"),
    description: Yup.string(),
    date: Yup.string().required("Campo obrigatório"),
    price: Yup.number()
      .typeError("Deve ser um número")
      .required("Campo obrigatório")
      .positive("Deve ser um valor positivo"),
  });

  const handleSubmit = (values: ExpenseValueType) => {
    setExpenses([...expensesValue, values]);
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
          <Grid style={{ width: "50%", marginLeft: "20%", marginTop: "2%" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                marginBottom: "2%",
              }}
            >
              <FormControl fullWidth>
                <Field
                  as={TextField}
                  name="nameExpense"
                  label="Gasto"
                  variant="outlined"
                />
                <ErrorMessage name="nameExpense" component="div" />
              </FormControl>
              <FormControl fullWidth>
                <Field as={TextField} name="name" label="Despesa" variant="outlined" />
                <ErrorMessage name="name" component="div" />
              </FormControl>
              <FormControl fullWidth>
                <Field
                  as={TextField}
                  type="date"
                  name="date"
                  variant="outlined"
                />
                <ErrorMessage name="date" component="div" />
              </FormControl>
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
              <FormControl fullWidth>
                <Field
                  as={TextField}
                  name="description"
                  label="Descrição"
                  variant="outlined"
                />
                <ErrorMessage name="description" component="div" />
              </FormControl>
              <FormControl fullWidth>
                <Field
                  as={TextField}
                  name="price"
                  label="Valor"
                  variant="outlined"
                />
                <ErrorMessage name="price" component="div" />
              </FormControl>
              <Button type="submit" variant="contained" color="primary" sx={{ width: "30%" }}>
                Adicionar
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default AddFixedExpenses;
