import React, { useState, useEffect } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Typography
} from "@mui/material";
import { AddFixedExpenses, Expense } from "./AddFixedExpenses";
import { setfixedExpense } from "services/fixedexpense.service";
import { getErro, getSuccess } from "utils/ModalAlert";
import { FixedExpensestype } from "types/FixedExpenses.types";

const FixedExpenseValues: FixedExpensestype = {
  name: "",
  description: "",
  date: new Date,
  total_price: 0,
};
const FixedExpensesTable = ({ expenses }: { expenses: Expense[] }) => {
  const [totalValue, setTotalValue] = useState<number>(0);
  const [manualTotalInput, setManualTotalInput] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const calculateTotal = () => {
    let total = 0;
    expenses.forEach((item: Expense) => {
      total += Number(item.value);
    });
    return total;
  };

  useEffect(() => {
    if (!manualTotalInput) {
      const newTotalValue = calculateTotal();
      setTotalValue(newTotalValue);
    }
  }, [expenses, manualTotalInput]);

  const toggleManualTotalInput = () => {
    setManualTotalInput(!manualTotalInput);
  };

  const handleTotalValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotalValue(parseFloat(event.target.value) || 0);
  };

  const handleRegister = async () => {
    try {
      const AddfixedExpense: FixedExpensestype = {
        name: FixedExpenseValues.name,
        description: FixedExpenseValues.description,
        date: FixedExpenseValues.date,
        total_price: totalValue,
      };
  
      setfixedExpense(
        AddfixedExpense.name,
        AddfixedExpense.description,
        AddfixedExpense.date,
        AddfixedExpense.total_price
      );
      
      handleClose();
      getSuccess("Resale Item registered Succesfully");
    } catch (error: any) {
      getErro(error.message);
    }
  };

  return (
    <>
      <Paper
        sx={{
          width: "90%",
          marginLeft: "5%",
        }}
      >
        <Grid>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((item: Expense, rowIndex: number) => (
                <TableRow key={rowIndex}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>R${item.value},00</TableCell>
                  <TableCell>{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid
        sx={{
          marginTop: "1%",
          display: "flex",
          flexDirection: "row",
          marginLeft: "30%",
          gap: "20px"
        }}
        >
        <div>
          <Button onClick={toggleManualTotalInput} variant="outlined">
            {manualTotalInput
              ? "Usar Cálculo Automático"
              : "Inserir Valor Manualmente"}
          </Button>
        </div>
        {manualTotalInput ? (
          <TextField
            label="Valor Total"
            variant="outlined"
            value={totalValue}
            onChange={handleTotalValueChange}
          />
        ) : (
          <Typography variant="subtitle2">Gastos totais: R${totalValue},00</Typography>
        )}
    
          <Button onClick={handleRegister} variant="outlined">Salvar</Button>
        </Grid>
      </Paper>
    </>
  );
};

export default FixedExpensesTable;
