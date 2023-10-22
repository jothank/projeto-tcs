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
import { getErro, getSuccess } from "utils/ModalAlert";
import DeleteIcon from "@mui/icons-material/Delete";
import { FixedExpenseType } from "types/FixedExpenses.types";
import { setfixedExpense } from "services/fixedexpense.service";

const FixedExpensesTable = ({
  expensesValue,
  setExpenses, 
}: {
  expensesValue: ExpenseValueType[];
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseValueType[]>>;
}) => {
  const [totalValue, setTotalValue] = useState<number>(0);
  const [manualTotalInput, setManualTotalInput] = useState(false);

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
        expenseId: expensesValue.length,
        name: expensesValue[0].name,
        total_price: totalValue,
      };

      const response = await setfixedExpense(fixedExpense);

      if (response) {
        getSuccess("Items de despesa registrados com sucesso");
        setExpenses([]); 
      } else {
        getErro("Falha ao registrar despesas");
      }
    } catch (error: any) {
      getErro(error.message);
    }
  };

  const handleDelete = (rowIndex: number) => {
    const updatedExpenses = [...expensesValue];
    updatedExpenses.splice(rowIndex, 1);
    setExpenses(updatedExpenses); // Atualize o estado com a nova lista de despesas após a exclusão
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
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expensesValue.map((item: ExpenseValueType, rowIndex: number) => (
                  <TableRow key={rowIndex}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>R${item.price},00</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        onClick={() => handleDelete(rowIndex)}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
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
