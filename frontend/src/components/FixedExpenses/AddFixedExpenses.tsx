import { Button, FormControl, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

export interface Expense {
  name: string;
  value: string;
  description: string;
  date: string;
  totalValue: string;
}

export const AddFixedExpenses = ({
  expenses,
  setExpenses,
}: {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}) => {
  const [expense, setExpense] = useState<Expense>({
    name: "",
    value: "",
    description: "",
    date: "",
    totalValue: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setExpenses([...expenses, expense]);
    setExpense({
      name: "",
      value: "",
      description: "",
      date: "",
      totalValue: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              name="name"
              label="Nome"
              variant="outlined"
              value={expense.name}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              name="value"
              label="Valor"
              variant="outlined"
              value={expense.value}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              name="description"
              label="Descrição"
              variant="outlined"
              value={expense.description}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              name="totalValue"
              label="Valor Total"
              variant="outlined"
              value={expense.totalValue}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Adicionar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddFixedExpenses;
