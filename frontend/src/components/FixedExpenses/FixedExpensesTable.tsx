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
  Typography,
  TableContainer,
} from "@mui/material";
import { getErro, getSuccess } from "utils/ModalAlert";
import DeleteIcon from "@mui/icons-material/Delete";
import { saveCosts, setFixedExpense } from "services/fixedexpense.service copy";
import { CostType } from "./AddFixedExpenses";
import AddFixedExpenses from "./AddFixedExpenses";
import { EditExpenseRow } from "./EditFixedExpenses";
import SearchForMonth from "./SearchForMonth";

const FixedExpensesTable = ({}: {}) => {
  const [costs, setCosts] = React.useState<CostType[]>([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const handleCostsUpdate = (newCosts: CostType[]) => {
    setCosts(newCosts);
  };
 
  const handleRegister = async () => {
    try {
      let ids: any[] = [];
      const response = await saveCosts(costs);
      response.costs.forEach((element: { id: any }) => {
        element.id;
        ids.push(element.id);
      });

      console.log(response.costs);
      console.log(ids);
      const test = await setFixedExpense(
        response.costs[0].name,
        "2021-10-01",
        ids
      );
      console.log(test);

      getSuccess("Despesas fixas salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar as despesas:", error);
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index); 
  };

  const handleSave = (index: number, updatedCost: CostType) => {
    const updatedCosts = [...costs];
    updatedCosts[index] = updatedCost;
    setCosts(updatedCosts);
    setEditingIndex(-1); 
  };

  const handleDelete = (index: number) => {
    const updatedCosts = [...costs];
    updatedCosts.splice(index, 1);
    setCosts(updatedCosts);
    setEditingIndex(-1);
  };

  return (
    <>
      <Typography variant="h5">Despesas Fixas</Typography>
      <Grid container
      sx={{
      display: "flex",
    flexDirection: "row"
      }}
      >
        <Grid item xs={6}>
      <AddFixedExpenses onCostsUpdate={handleCostsUpdate} />
      </Grid>
      <Grid item xs={6}>
      <SearchForMonth />
      </Grid>
      </Grid>
      <Paper
        sx={{
          width: "90%",
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
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {costs.map((cost, index) => (
                  <EditExpenseRow
                    key={cost.name}
                    cost={cost}
                    onEdit={() => handleEdit(index)}
                    onDelete={() => handleDelete(index)}   
                    onSave={(updatedCost: any) => handleSave(index, updatedCost)}
                    isEditing={editingIndex === index}
                                   
                    />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Button onClick={handleRegister} variant="outlined">
          Salvar
        </Button>
      </Paper>
    </>
  );
};

export default FixedExpensesTable;
