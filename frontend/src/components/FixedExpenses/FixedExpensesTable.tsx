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
  TableContainer,
} from "@mui/material";
import { formatToBRL } from "utils/pricing";
import { ExpenseValueType } from "./AddFixedExpenses copy";
import { getErro, getSuccess } from "utils/ModalAlert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ExpenseType, FixedExpenseType } from "types/FixedExpenses.types";
import { saveExpenses, setfixedExpense } from "services/fixedexpense.service";

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

  const [isEditing, setIsEditing] = useState<boolean[]>(Array(expensesValue.length).fill(false));

  const handleEditExpense = (rowIndex: number, fieldName: string, value: any) => {
    const updatedExpenses = [...expensesValue];
    updatedExpenses[rowIndex] = {
      ...updatedExpenses[rowIndex],
      [fieldName]: value,
    };
    setExpenses(updatedExpenses);
  };

  const handleEdit = (rowIndex: number) => {
    const newIsEditing = [...isEditing];
    newIsEditing[rowIndex] = !newIsEditing[rowIndex];
    setIsEditing(newIsEditing);
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
   const expense: ExpenseType[] = [
  {
    id: 1,
    nameExpense: expensesValue[0].nameExpense,
    price: expensesValue[0].price,
    description: expensesValue[0].description,
  },
];

const expenseResponse = await saveExpenses(expense);
  
      const fixedExpense: FixedExpenseType = {
        id: 0,
        name: expensesValue[0].name,
        date: expensesValue[0].date,
        description: expensesValue[0].description,
        expenses: expense.map((e) => e.id).filter((id) => id !== undefined) as number[],
      };
  
      const fixedExpenseResponse = await setfixedExpense(fixedExpense);
  
      console.log("response", fixedExpenseResponse.expenses);
  
      if (fixedExpenseResponse) {
        getSuccess("Items de despesa registrados com sucesso");
        setExpenses([]);
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
                  <TableCell>Mês Referência</TableCell>
                  <TableCell>Despesa</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expensesValue.map((item: ExpenseValueType, rowIndex: number) => (
                  <TableRow key={rowIndex}>
                    <TableCell>
                      {isEditing[rowIndex] ? (
                        <TextField
                          name="name"
                          value={item.name}
                          onChange={(e) => handleEditExpense(rowIndex, "name", e.target.value)}
                        />
                      ) : (
                        item.name
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing[rowIndex] ? (
                        <TextField
                          name="nameExpense"
                          value={item.nameExpense}
                          onChange={(e) => handleEditExpense(rowIndex, "nameExpense", e.target.value)}
                        />
                      ) : (
                        item.nameExpense
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing[rowIndex] ? (
                        <TextField
                          name="description"
                          value={item.description}
                          onChange={(e) =>
                            handleEditExpense(rowIndex, "description", e.target.value)
                          }
                        />
                      ) : (
                        item.description
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing[rowIndex] ? (
                        <TextField
                          name="price"
                          value={item.price}
                          onChange={(e) =>
                            handleEditExpense(rowIndex, "price", parseFloat(e.target.value) || 0)
                          }
                        />
                      ) : (
                        `R$${formatToBRL(item.price)},00`
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing[rowIndex] ? (
                        <TextField
                          type="date"
                          name="date"
                          value={item.date}
                          onChange={(e) => handleEditExpense(rowIndex, "date", e.target.value)}
                        />
                      ) : (
                        item.date
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing[rowIndex] ? (
                        <Button onClick={() => handleEdit(rowIndex)}>Salvar</Button>
                      ) : (
                        <>
                          <Button color="error" >
                            <DeleteIcon />
                          </Button>
                          <Button color="info" onClick={() => handleEdit(rowIndex)}>
                            <EditIcon />
                          </Button>
                        </>
                      )}
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
            gap: "20px",
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
            <Typography variant="subtitle2">Gastos totais: R$ {formatToBRL(totalValue)}</Typography>
          )}
          <Button onClick={handleRegister} variant="outlined">
            Salvar
          </Button>
        </Grid>
      </Paper>
    </>
  );
};

export default FixedExpensesTable;