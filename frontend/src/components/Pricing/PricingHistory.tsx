import React, { useEffect, useState } from 'react';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { getPricing } from 'services/pricing.service';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ProductPricingType } from 'types/pricing,types';

 
const PricingHistory = () => {
  const [pricingData, setPricingData] = useState<ProductPricingType[]>([]);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const pricingData = await getPricing();
        console.log(pricingData)
        setPricingData(pricingData.results);  
      } catch (error) {
        console.error('Error fetching pricing data', error);
      }
    };

    fetchPricing();
  }, []);

  return (
    <Grid
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
    >
    <Paper sx={{ width: '80%' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Condomínio</TableCell>
              <TableCell>Imposto</TableCell>
              <TableCell>Cartão Débito/Crédito</TableCell>
              <TableCell>Outros</TableCell>
              <TableCell>Lucro</TableCell>
              <TableCell>Entrega</TableCell>
              <TableCell>Preço Sugerido</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pricingData.map((pricing) => (
              <TableRow key={pricing.id}>
                <TableCell>{pricing.product?.name || pricing.combo?.name}</TableCell>
                <TableCell>{pricing.product?.price || pricing.combo?.price}</TableCell>
                <TableCell>{pricing.condominium}</TableCell>
                <TableCell>{pricing.tax}</TableCell>
                <TableCell>{pricing.card_tax}</TableCell>
                <TableCell>{pricing.other}</TableCell>
                <TableCell>{pricing.profit}</TableCell>
                <TableCell>{pricing.delivery_price}</TableCell>
                <TableCell>{pricing.suggested_price}</TableCell>
                <TableCell>
                  <Button>
                    <DeleteIcon sx={{color: "red"}}/>
                  </Button>
                  <Button>
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    </Grid>
  );
};

export default PricingHistory;
