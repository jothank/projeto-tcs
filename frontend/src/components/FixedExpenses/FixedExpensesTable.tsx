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
import { formatToBRL } from "utils/pricing";
import { getErro, getSuccess } from "utils/ModalAlert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ExpenseType, FixedExpenseType } from "types/FixedExpenses.types";
import { saveCosts, setFixedExpense } from "services/fixedexpense.service copy";
import { CostType } from "./AddFixedExpenses";
import AddFixedExpenses from "./AddFixedExpenses";

const FixedExpensesTable = ({}: {}) => {
  const [costs, setCosts] = React.useState<CostType[]>([]);

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

  return (
    <>
      <Typography variant="h5">Despesas Fixas</Typography>
      <AddFixedExpenses onCostsUpdate={handleCostsUpdate} />
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
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {costs.map((cost) => (
                  <TableRow key={cost.name}>
                    <TableCell>{cost.name}</TableCell>
                    <TableCell>{cost.nameExpense}</TableCell>
                    <TableCell>{cost.description}</TableCell>
                    <TableCell>{formatToBRL(cost.price)}</TableCell>
                    <TableCell>{cost.date}</TableCell>
                    <TableCell>
                      <Button>
                        <EditIcon />
                      </Button>
                      <Button>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
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
