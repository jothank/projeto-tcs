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
  Tooltip,
  Grid,
} from "@mui/material";
import { formatToBRL } from "utils/pricing";
import { ProductionSimulatorType } from "./ProductionSimulatorTable";
import InfoIcon from "@mui/icons-material/Info";
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
  const calculateTaxFee = () =>
    productionSimulator.reduce(
      (acc, curr) =>
        acc +
        curr.pricing.suggested_price *
        curr.production_quantity *
        (curr.pricing.tax / 100),
      0
    );

  const calculateResult = () => {
    const billing = calculateBilling();
    const totalProduction = calculateTotalProduction();
    const cardFee = calculateCardFee();
    const fixedExpense = selectedFixedExpense?.total_price || 0;
    const taxFee = calculateTaxFee();

    return billing - totalProduction - cardFee - fixedExpense - taxFee;
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" align="center">
        Amortização do Custo Fixo
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Grid
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Faturamento
                <Tooltip
                  title="O faturamento se refere ao cálculo do valor total multiplicando as quantidades de produção pelos preços sugeridos atribuídos a cada item individual."
                  placement="bottom"
                >
                  <InfoIcon />
                </Tooltip>
              </Grid>
            </TableCell>
            <TableCell align="center">
              <Grid
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Total do Custo Unitário
                <Tooltip
                  title="O total do custo unitário se refere ao cálculo do valor total multiplicando as quantidades de produção pelos custos unitários atribuídos a cada item individual."
                  placement="bottom"
                >
                  <InfoIcon />
                </Tooltip>
              </Grid>
            </TableCell>
            <TableCell align="center">
              <Grid
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Taxa do Cartão
                <Tooltip
                  title="A taxa do cartão se refere ao cálculo do valor total multiplicando as quantidades de produção pelos preços sugeridos e pelas taxas do cartão atribuídas a cada item individual."
                  placement="bottom"
                >
                  <InfoIcon />
                </Tooltip>
              </Grid>
            </TableCell>
            <TableCell align="center">
              <Grid
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Imposto
                <Tooltip
                  title="O imposto se refere ao cálculo do valor total multiplicando as quantidades de produção pelos preços sugeridos e pelas taxas de imposto atribuídas a cada item individual."
                  placement="bottom"
                >
                  <InfoIcon />
                </Tooltip>
              </Grid>
            </TableCell>
            <TableCell align="center">
              <Grid
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Resultado
                <Tooltip
                  title="O resultado se refere ao cálculo da diferença entre o faturamento e a soma dos custos unitários, taxas do cartão, custos fixos e impostos de cada item individual."
                  placement="bottom"
                >
                  <InfoIcon />
                </Tooltip>
              </Grid>
            </TableCell>
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
              {formatToBRL(calculateTaxFee())}
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
