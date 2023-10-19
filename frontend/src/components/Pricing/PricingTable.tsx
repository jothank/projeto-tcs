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
  TableContainer
} from "@mui/material";
import AddPricing from "./AddPricing";
import AddProduct from "components/Product/AddProduct";
import { ProductTableProps } from "types/Product.types";
import { getAllProduct } from "services/productRegistration.service";

const PricingTable = () => {

  const [supplies, setSupplies] = useState<ProductTableProps>({
    data: {
      results: [],
    },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProduct();
        setSupplies({ data: { results: data } });
      } catch (error: any) {
        console.error("Failed to fetch feedstocks:", error.message);
      }
    };

    fetchProducts();
  }, []);

return (
    <Grid>
    <TableContainer>
        {/* <AddProduct /> */}
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Insumos</TableCell>
          <TableCell>Uni. Medida</TableCell>
          <TableCell>Qtd/Uso</TableCell>
          <TableCell>Uni. Medida</TableCell>
          <TableCell>Produção</TableCell>
          <TableCell>Custo de Aquisição</TableCell>
          <TableCell>Custo Unitario</TableCell>
          
        </TableRow>
      </TableHead>
      <TableBody>
        {/* {expensesValue.map((item: ExpenseValueType, rowIndex: number) => (
          <TableRow key={rowIndex}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>R${item.price},00</TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>
              <Button
                color="error"
                onClick={() => handleDelete(rowIndex)}
              >
                <DeleteIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))} */}
      </TableBody>
      <TableCell>Custo Produção</TableCell>
      <TableCell>15452</TableCell>
     <Table>
      <TableCell>Condominio</TableCell>
      <TableCell>6</TableCell>
      <TableCell>Imposto</TableCell>
      <TableCell></TableCell>
      <TableCell>Cartão Débito/Crédito</TableCell>
      <TableCell></TableCell>
      <TableCell>Outros</TableCell>
      <TableCell></TableCell>
      <TableCell>Preço sugerido</TableCell>
      <TableCell></TableCell>
     </Table>
      
    </Table>
  </TableContainer>
  </Grid>
)

}

export default PricingTable;