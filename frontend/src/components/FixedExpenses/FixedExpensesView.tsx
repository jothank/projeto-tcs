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
  Box,
  Paper,
  Grid,
} from "@mui/material";
import { CostType } from "./AddFixedExpenses";
import {
  deleteCost,
  deleteFixedExpense,
  getFixedExpense,
  saveCosts,
  updateCost,
  updateFixedExpense,
} from "services/fixedexpense.service";
import { formatToBRL } from "utils/pricing";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditFixedExpenses from "./ModalEdit";
import ModalAddFixedExpenses from "./ModalAddFixedExpenses";

export interface FixedExpenseType {
  id?: string;
  name: string;
  description: string;
  date: string;
  total_price: number;
  costs: CostType[];
  type: string;
}

const FixedExpensesTableView = () => {
  const [fixedExpenses, setFixedExpenses] = useState<FixedExpenseType[]>([]);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [currentCost, setCurrentCost] = React.useState<CostType | null>(null);

  const [selectedFixedExpense, setSelectedFixedExpense] =
    React.useState<FixedExpenseType | null>(null);

  async function handleDeleteCost(costId: string) {
    try {
      await deleteCost(costId);
      if (selectedFixedExpense && selectedFixedExpense.costs) {
        const updatedCosts = selectedFixedExpense.costs.filter(
          (cost) => cost.id !== costId
        );

        const totalCostsPrice = updatedCosts.reduce(
          (total, cost) => total + cost.price,
          0
        );

        const updatedFixedExpense = {
          ...selectedFixedExpense,
          costs: updatedCosts,
          total_price: totalCostsPrice,
        };

        setSelectedFixedExpense(updatedFixedExpense);

        setFixedExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === updatedFixedExpense.id
              ? updatedFixedExpense
              : expense
          )
        );
      }
    } catch (error) {
      console.log("Erro ao deletar o custo:", error);
    }
  }

  function openEditModal(cost: any): void {
    setCurrentCost(cost);
    setOpenEdit(true);
  }

  async function handleEditModal(editedCost: any) {
    try {
      const updatedCost = await updateCost(editedCost);
      if (selectedFixedExpense && selectedFixedExpense.costs) {
        const updatedCosts = selectedFixedExpense.costs.map((cost) =>
          cost.id === updatedCost.id ? updatedCost : cost
        );

        const totalCostsPrice = updatedCosts.reduce(
          (total, cost) => total + cost.price,
          0
        );

        const updatedFixedExpense = {
          ...selectedFixedExpense,
          costs: updatedCosts,
          total_price: totalCostsPrice,
        };

        setSelectedFixedExpense(updatedFixedExpense);

        setFixedExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === updatedFixedExpense.id
              ? updatedFixedExpense
              : expense
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteFixedExpense = async (fixedExpenseId: string) => {
    try {
      const response = await deleteFixedExpense(fixedExpenseId);
      window.location.reload();
    } catch (error) {}
  };  
  
  const handleEditFixedExpense = async (fixedExpenseId: string) => {
    try {
      const response = await deleteFixedExpense(fixedExpenseId);
      window.location.reload();
    } catch (error) {}
  };

  useEffect(() => {
    const fetchFixedExpenses = async () => {
      const result = await getFixedExpense();
      setFixedExpenses(result.results);
    };

    fetchFixedExpenses();
  }, []);

  async function handleCostsUpdate(newCosts: CostType[]): Promise<void> {
    try {
      const response = await saveCosts(newCosts);
      const ids = selectedFixedExpense?.costs.map((item) => item?.id);
      ids?.push(response.costs[0].id);
      const update = await updateFixedExpense(selectedFixedExpense, ids);
      setSelectedFixedExpense(update);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <FormControl fullWidth margin="normal">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <InputLabel>Selecione a despesa</InputLabel>
            <Select
              fullWidth
              value={selectedFixedExpense?.id || ""}
              onChange={(event) =>
                setSelectedFixedExpense(
                  fixedExpenses.find(
                    (fixedExpense) => fixedExpense.id === event.target.value
                  ) || null
                )
              }
            >
              {fixedExpenses.map((fixedExpense) => (
                <MenuItem key={fixedExpense.id} value={fixedExpense.id}>
                  {fixedExpense.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          {selectedFixedExpense && (
            <>
              <Grid item>
                <Button
                  fullWidth
                  color="secondary"
                  onClick={() =>
                    handleDeleteFixedExpense(selectedFixedExpense.id || "")
                  }
                  startIcon={<DeleteIcon />}
                />
              </Grid> 
              <Grid item>
                <Button
                  fullWidth
                  color="primary"
                  onClick={() =>
                    handleEditFixedExpense(selectedFixedExpense.id || "")
                  }
                  startIcon={<EditIcon />}
                />
              </Grid>
            </>
          )}
        </Grid>
      </FormControl>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Despesa</TableCell>
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Valor</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedFixedExpense?.costs.map((cost, index) => (
              <TableRow
                key={cost.id}
                sx={{
                  backgroundColor: index % 2 !== 0 ? "#f9f9f9" : "#ffffff",
                }}
              >
                <TableCell align="center">{cost.name}</TableCell>
                <TableCell align="center">{cost.description}</TableCell>
                <TableCell align="center">{formatToBRL(cost.price)}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => cost.id && handleDeleteCost(cost.id)}
                    color="secondary"
                    startIcon={<DeleteIcon />}
                  />
                  <Button
                    onClick={() => openEditModal(cost)}
                    color="primary"
                    startIcon={<EditIcon />}
                  />
                </TableCell>
              </TableRow>
            ))}
            {!selectedFixedExpense?.costs.length && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Nenhuma despesa selecionada
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedFixedExpense?.type === "automatic" && (
        <ModalAddFixedExpenses onCostsUpdate={handleCostsUpdate} />
      )}

      {selectedFixedExpense && (
        <>
          <Typography variant="subtitle1" align="right">
            Preço Total: {formatToBRL(selectedFixedExpense.total_price)}
          </Typography>
        </>
      )}
      <EditFixedExpenses
        open={openEdit}
        cost={currentCost}
        onClose={() => setOpenEdit(false)}
        onUpdate={handleEditModal}
      />
    </>
  );
};

export default FixedExpensesTableView;
