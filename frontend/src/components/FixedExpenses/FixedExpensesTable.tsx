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
  Typography,
  TableContainer
} from "@mui/material";
import { ExpenseValueType } from "./AddFixedExpenses";
import { setfixedExpense } from "services/fixedexpense.service";
import { getErro, getSuccess } from "utils/ModalAlert";
import { FixedExpenseType } from "types/FixedExpenses.types";

const FixedExpenseValues: FixedExpenseType = {
  id: 0,
  name: "",
  description: "",
  price: 0,
  date: "",
  total_price: 0,
  expenses: [],
};
const FixedExpensesTable = ({ expensesValue }: { expensesValue: ExpenseValueType[] }) => {
  const [totalValue, setTotalValue] = useState<number>(0);
  const [manualTotalInput, setManualTotalInput] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const calculateTotal = () => {
    let total = 0;
    expensesValue.forEach((item: ExpenseValueType) => {
      total += Number(item.price);
    });
    return total;
  };

  useEffect(() => {
    if (!manualTotalInput) {
      const newTotalValue = calculateTotal();
      setTotalValue(newTotalValue);
    }
  }, [expensesValue, manualTotalInput]);

  const toggleManualTotalInput = () => {
    setManualTotalInput(!manualTotalInput);
  };

  const handleTotalValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotalValue(parseFloat(event.target.value) || 0);
  };

  const handleRegister = async () => {
    try {
      const fixedExpense: FixedExpenseType = {
        name: expensesValue[0].name,
        description: expensesValue[0].description,
        price: expensesValue[0].price,
        expenses: expensesValue.map((item) => ({
          name: item.name,
          price: item.price,
          description: item.description,
        })),
        date: expensesValue[0].date,
        total_price: totalValue,
      };

      const response = await setfixedExpense(
        fixedExpense.name,
        fixedExpense.description,
        fixedExpense.price,
        fixedExpense.expenses,
        fixedExpense.date,
        fixedExpense.total_price
      );

      if (response) {
        getSuccess("Items de despesa registrados com sucesso");
      } else {
        getErro("Falha ao registrar despesas");
      }
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
          <TableContainer>
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
                {expensesValue.map((item: ExpenseValueType, rowIndex: number) => (
                  <TableRow key={rowIndex}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>R${item.price},00</TableCell>
                    <TableCell>{item.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
            <>
              <TextField
                label="nome"
                variant="outlined"
                value={FixedExpenseValues.name}
                onChange={handleTotalValueChange}
              />
              <TextField
                label="Valor Total"
                variant="outlined"
                value={totalValue}
                onChange={handleTotalValueChange}
              />
              <TextField
                label="Data"
                variant="outlined"
                value={FixedExpenseValues.date}
                onChange={handleTotalValueChange}
              />
            </>
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