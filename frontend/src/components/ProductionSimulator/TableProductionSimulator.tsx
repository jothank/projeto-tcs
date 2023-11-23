import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { formatToBRL } from "utils/pricing";
import { ProductionSimulatorType } from "./ProductionSimulatorTable";
import { FixedExpenseType } from "components/FixedExpenses/FixedExpensesView";

interface ProductionTableProps {
  productionSimulator: ProductionSimulatorType[];
  selectedFixedExpense?: FixedExpenseType | null;
}

const ProductionTable: React.FC<ProductionTableProps> = ({
  productionSimulator,
  selectedFixedExpense,
}) => {
  if (!productionSimulator) return null;

  const calculateBilling = () =>
    productionSimulator.reduce(
      (acc, curr) =>
        acc + curr.pricing.suggested_price * curr.production_quantity,
      0
    );

  const calculateTotalProduction = () =>
    productionSimulator.reduce((acc, curr) => {
      const price =
        curr.pricing.product?.price ?? curr.pricing.combo?.price ?? 0;
      return acc + price * curr.production_quantity;
    }, 0);

  const calculateCardFee = () =>
    productionSimulator.reduce(
      (acc, curr) =>
        acc +
        curr.pricing.suggested_price *
          curr.production_quantity *
          (curr.pricing.card_tax / 100),
      0
    );

  const calculateResult = () => {
    const billing = calculateBilling();
    const totalProduction = calculateTotalProduction();
    const cardFee = calculateCardFee();
    const fixedExpense = selectedFixedExpense?.total_price || 0;

    return billing - totalProduction - cardFee - fixedExpense;
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" align="center">
        Amortização do Custo Fixo
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Faturamento</TableCell>
            <TableCell align="center">Total de Produção</TableCell>
            <TableCell align="center">Taxa do Cartão</TableCell>
            <TableCell align="center">Resultado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">
              {formatToBRL(calculateBilling())}
            </TableCell>
            <TableCell align="center">
              {formatToBRL(calculateTotalProduction())}
            </TableCell>
            <TableCell align="center">
              {formatToBRL(calculateCardFee())}
            </TableCell>
            <TableCell align="center">
              {formatToBRL(calculateResult())}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductionTable;
