import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Typography,
} from "@mui/material";
import { formatToBRL } from "utils/pricing";
import { formatDate } from "utils/date";

const TableFixedExpense = ({ fixedExpense }: any) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" align="center">
        Despesa
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nome</TableCell>
            <TableCell align="center">Descrição</TableCell>
            <TableCell align="center">Data</TableCell>
            <TableCell align="center">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">{fixedExpense.name}</TableCell>
            <TableCell align="center">{fixedExpense.description}</TableCell>
            <TableCell align="center">
              {formatDate(fixedExpense.date)}
            </TableCell>
            <TableCell align="center">
              {formatToBRL(fixedExpense.total_price)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableFixedExpense;
