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
  Typography,
  TableContainer,
  FormControl,
  FormControlLabel,
  Switch,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getProductionSimulator } from "services/ProductionSimulator.service";
import { formatToBRL } from "utils/pricing";

export interface PricingType {
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
  const [productionSimulator, setProductionSimulator] = useState<
    ProductionSimulatorType[]
  >([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProductionSimulator();
        setProductionSimulator(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
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
    </>
  );
};

export default ProductionSimulatorTable;
