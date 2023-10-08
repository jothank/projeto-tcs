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

const FixedExpensesTable = ({ expenses }: { expenses: Expense[] }) => {
  const [totalValue, setTotalValue] = useState<number | string>("");
  const [manualTotalInput, setManualTotalInput] = useState(false);

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
    setTotalValue(event.target.value);
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
          justifyContent: "space-between",
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
    
          <Button>Salvar</Button>
        </Grid>
      </Paper>
    </>
  );
};

export default FixedExpensesTable;
