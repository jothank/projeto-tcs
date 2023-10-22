import { Button, FormControl, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

export interface ExpenseValueType {
  nameExpense: string,
  name: string;
  description: string;
  date: string;
  price: number; 
}

export const AddFixedExpenses = ({
  expensesValue,
  setExpenses,
}: {
  expensesValue: ExpenseValueType[];
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseValueType[]>>;
}) => {
  const [expense, setExpense] = useState<ExpenseValueType>({
    nameExpense: "",
    name: "",
    description: "",
    date: "",
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setExpenses([...expensesValue, expense]);
    setExpense({
     nameExpense: "",
      name: "",
      description: "",
      date: "",
      price: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid style={{ width: "50%", marginLeft: "20%", marginTop: "2%" }}>
        <Grid sx={{ display: "flex", flexDirection: "row", gap: "20px", marginBottom: "2%" }}>
          <FormControl fullWidth>
            <TextField
              name="nameExpense"
              label="Gasto"
              variant="outlined"
              value={expense.nameExpense}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              name="name"
              label="Despesa"
              variant="outlined"
              value={expense.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              type="date"
              name="date"
              variant="outlined"
              value={expense.date}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <FormControl fullWidth>
            <TextField
              name="description"
              label="Descrição"
              variant="outlined"
              value={expense.description}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              name="price"
              label="Valor"
              variant="outlined"
              value={expense.price}
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" variant="contained" color="primary" sx={{ width: "30%" }}>
            Adicionar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddFixedExpenses;
