import React, { useEffect, useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableContainer,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getProductionSimulator } from "services/ProductionSimulator.service";
import { formatToBRL } from "utils/pricing";
import { FixedExpenseType } from "components/FixedExpenses/FixedExpensesView";
import { getFixedExpense } from "services/fixedexpense.service";
import TableFixedExpense from "./TableFixedExpense";
import ProductionTable from "./TableProductionSimulator";
import ModalAddProductionSimulator from "./ModalAddProductionSimulator";
import { getPricing } from "services/pricing.service";

export interface PricingType {
  id?: number;
  tax: number;
  card_tax: number;
  other?: number;
  profit: number;
  suggested_price: number;
  delivery_price?: number;
  condominium: number;
  product?: any;
  combo?: any;
}

export interface ProductionSimulatorType {
  pricing: PricingType;
  production_quantity: number;
  amortization: number;
}

const ProductionSimulatorTable = () => {
  const [open, setOpen] = useState(false);
  const [productionSimulator, setProductionSimulator] = useState<
    ProductionSimulatorType[]
  >([]);
  const [fixedExpenses, setFixedExpenses] = useState<FixedExpenseType[]>([]);
  const [selectedFixedExpense, setSelectedFixedExpense] =
    React.useState<FixedExpenseType | null>(null);
  const [pricings, setPricings] = React.useState<PricingType[]>([]);


  useEffect(() => {
    (async () => {
      try {
        const data = await getProductionSimulator();
        setProductionSimulator(data);
        const result = await getFixedExpense();
        setFixedExpenses(result.results);
        const response = await getPricing();
        setPricings(response.results);
          console.log(pricings);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Selecione a despesa</InputLabel>
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
              {fixedExpenses.map((fixedExpense) => (
                <MenuItem key={fixedExpense.id} value={fixedExpense.id}>
                  {fixedExpense.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
          onClick={() => setOpen(true)}
          >Simular Produção</Button>
        </Grid>
        <Grid item xs={12}>
          {selectedFixedExpense && (
            <TableFixedExpense fixedExpense={selectedFixedExpense} />
          )}
        </Grid>
        <Grid item xs={12}>
          {productionSimulator && (
            <ProductionTable
              selectedFixedExpense={selectedFixedExpense}
              productionSimulator={productionSimulator}
            />
          )}
        </Grid>
      </Grid>
      <Paper sx={{ width: "100%", marginTop: "2%" }}>
        <TableContainer>
          <Typography variant="h5" align="center">
            Simulador de Produção
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Porções</TableCell>
                <TableCell align="center">Condominio Unitário</TableCell>
                <TableCell align="center">Produção</TableCell>
                <TableCell align="center">Amortização</TableCell>
                <TableCell align="center">PV</TableCell>
                <TableCell align="center">Produção</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productionSimulator.map((simulator, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 !== 0 ? "#ffffff" : "#f2f2f2",
                  }}
                >
                  <TableCell align="center">
                    {simulator.pricing.product?.name ||
                      simulator.pricing.combo?.name}
                  </TableCell>
                  <TableCell align="center">
                    {formatToBRL(simulator.pricing.condominium)}
                  </TableCell>
                  <TableCell align="center">
                    {simulator.production_quantity}
                  </TableCell>
                  <TableCell align="center">
                    {formatToBRL(simulator.amortization)}
                  </TableCell>
                  <TableCell align="center">
                    {formatToBRL(simulator.pricing.suggested_price)}
                  </TableCell>
                  <TableCell align="center">
                    {formatToBRL(simulator.pricing.combo?.price) ||
                      formatToBRL(simulator.pricing.product?.price)}
                  </TableCell>

                  <TableCell align="center">
                    <Button>
                      <DeleteIcon
                        style={{
                          cursor: "pointer",
                          color: "red",
                        }}
                      />
                    </Button>
                    <Button>
                      <EditIcon
                        style={{
                          cursor: "pointer",
                          color: "blue",
                        }}
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ModalAddProductionSimulator open={open} onClose={() => setOpen(false)} pricings={pricings} />
    </>
  );
};

export default ProductionSimulatorTable;
