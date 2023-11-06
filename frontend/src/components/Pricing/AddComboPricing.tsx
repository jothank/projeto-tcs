import React, { useState, useEffect } from 'react';
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';


import { getCombos } from 'services/combo.service';
import FinancialComponent from './FinancialComponent';
import { PricingType } from 'types/pricing.types';

interface Combo {
  id: number;
  name: string;
  price: number;
  products: Product[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  unit: string;
}
const AddComboPricing = () => {
  const [updatedFinancials, setUpdatedFinacials] = useState<PricingType[]>([]);
  const [combosData, setCombosData] = useState<Combo[]>([]);

  useEffect(() => {
    const fetchCombos = async () => {
      try {
        const combosData = await getCombos();

        setCombosData(combosData);
      } catch (error) {
        console.error('Erro ao buscar combos:', error);
      }
    };

    fetchCombos();
  }, []);

  const handlePricingUpdate = (newFinancials: PricingType[]) => {
    setUpdatedFinacials(newFinancials);
  }


  return (
    <Paper
     sx={{
      width: "80%"
     }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Insumo</TableCell>
              <TableCell>Qtd de uso</TableCell>
              <TableCell>Unidade medida</TableCell>
              <TableCell>Custo de aquisição</TableCell>
              <TableCell>Custo de Unitario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {combosData.map((combo) => (
  <TableRow key={combo.id}>
    <TableCell>{combo.price}</TableCell>
    
    {combo.products.map((product) => (
      <TableRow key={product.id}>
        <TableCell align='right'>{product.name}</TableCell>
        <TableCell>{product.quantity}</TableCell>
        <TableCell>{product.unit}</TableCell>
        <TableCell>{product.price}</TableCell>
        <TableCell>R${(product.price / product.quantity).toFixed(2)}</TableCell>
      </TableRow>
    ))}
  </TableRow>
))}
          </TableBody>
        </Table>
        <Grid
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end"
          }}
        >
          <TableCell>Custo de produção</TableCell>
          {/* <TableCell>{combosData.price.toFixed(2)}</TableCell> */}
        </Grid>
      </TableContainer>
      <FinancialComponent onFinancial={handlePricingUpdate} />
    </Paper>
  )

}


export default AddComboPricing;