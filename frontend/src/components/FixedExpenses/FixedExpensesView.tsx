import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  TableContainer,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { CostType } from "./AddFixedExpenses";
import { getFixedExpense } from "services/fixedexpense.service";
import { formatToBRL } from "utils/pricing";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export interface FixedExpenseType {
  id?: string;
  name: string;
  description: string;
  date: string;
  total_price: number;
  costs: CostType[];
}

const FixedExpensesTableView = () => {
  const [fixedExpenses, setFixedExpenses] = useState<FixedExpenseType[]>([]);

  const [selectedFixedExpense, setSelectedFixedExpense] =
    React.useState<FixedExpenseType | null>(null);

  function handleDeleteCost(index: any): void {
    throw new Error("Function not implemented.");
  }

  function openEditModal(cost: any): void {
    throw new Error("Function not implemented.");
  }

  useEffect(() => {
    const fetchFixedExpenses = async () => {
      const result = await getFixedExpense();
      setFixedExpenses(result.results);
    };

    fetchFixedExpenses();
  }, []);

  return (
    <>
      <Typography variant="h5">Despesas Fixas</Typography>
      <FormControl fullWidth>
        <InputLabel>Selecione a depesa</InputLabel>
        <Select
          value={selectedFixedExpense?.id || ""}
          onChange={(event) =>
            setSelectedFixedExpense(
              fixedExpenses.find(
                (fixedExpense) => fixedExpense.id === event.target.value
              ) || null
            )
          }
        >
          {fixedExpenses.map((fixedExpense: FixedExpenseType) => (
            <MenuItem key={fixedExpense.id} value={fixedExpense.id}>
              {fixedExpense.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Despesa</TableCell>
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Valor</TableCell>
              <TableCell align="center" sx={{ width: "20%" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedFixedExpense ? (
              selectedFixedExpense.costs.map((cost, index) => (
                <TableRow
                  key={cost.id}
                  sx={{
                    backgroundColor: index % 2 !== 0 ? "#ffffff" : "#f2f2f2",
                  }}
                >
                  <TableCell align="center">{cost.name}</TableCell>
                  <TableCell align="center">{cost.description}</TableCell>
                  <TableCell align="center">
                    {formatToBRL(cost.price)}
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleDeleteCost(index)}>
                      <DeleteIcon
                        style={{
                          cursor: "pointer",
                          marginRight: "10px",
                          color: "red",
                        }}
                      />
                    </Button>
                    <Button onClick={() => openEditModal(cost)}>
                      <EditIcon
                        style={{
                          cursor: "pointer",
                          marginRight: "10px",
                          color: "blue",
                        }}
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Nenhum produto selecionado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default FixedExpensesTableView;
