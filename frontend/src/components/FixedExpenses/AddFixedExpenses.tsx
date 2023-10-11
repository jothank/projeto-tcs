import { Button, FormControl, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

export interface ExpenseValueType {
  name: string;
  expenses: string;
  description: string;
  date: string;
  totalValue: string;
}

export const AddFixedExpenses = ({
  expensesValue,
  setExpenses,
}: {
  expensesValue: ExpenseValueType[];
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseValueType[]>>;
}) => {
  const [expense, setExpense] = useState<ExpenseValueType>({
    name: "",
    expenses: "",
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
    const expenseToSend = {
      ...expense,
      expenses: expense.expenses,
    };

    setExpenses([...expensesValue, expenseToSend]);
    setExpense({
      name: "",
      expenses: "",
      description: "",
      date: "",
      totalValue: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={4}
      sx={{
      display: "flex",
      marginLeft: '15%',
      marginTop: '2%'
     
      }}
      >
        <Grid sx={{display: 'flex', gap: '20px'}}>
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
              name="expenses"
              label="Valor"
              variant="outlined"
              value={expense.expenses}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}  sm={6}>
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
        <Grid item xs={12}  sm={6}>
          <Button type="submit" variant="contained" color="primary">
            Adicionar
          </Button>
        </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddFixedExpenses;
