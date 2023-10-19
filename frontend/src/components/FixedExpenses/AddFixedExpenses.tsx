import { Button, FormControl, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

export interface ExpenseValueType {
  name: string;
  price: number;
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
    price: 0,
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
    setExpenses([...expensesValue, expense]);
    setExpense({
      name: "",
      price: 0,
      description: "",
      date: "",
      totalValue: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
    <Grid style={{ width: "50%", marginLeft: "20%",  marginTop: '2%' }}>
      <Grid sx={{display: "flex", flexDirection: "row", gap: "20px", marginBottom: "2%"}}>
        <FormControl fullWidth>
          <TextField
            name=""
            label="Gasto"
            variant="outlined"
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
      <Grid sx={{display: "flex", flexDirection: "row", gap: "20px"}}>
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
            name="price"
            label="Valor"
            variant="outlined"
            value={expense.price}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            name="description"
            label="Descrição"
            variant="outlined"
            value={expense.description}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary"
        sx={{
          width: "30%"
        }}
        >
          Adicionar
        </Button>
      </Grid>
    </Grid>
  </form>
  
  
  
  );
};

export default AddFixedExpenses;
