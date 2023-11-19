import React, { useState, useEffect } from 'react';
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { getCombos } from 'services/combo.service';
import FinancialComponent from './FinancialComponent';
import { PricingType } from 'types/pricing,types';
import { setPricing } from 'services/pricing.service';
import { formatToBRL } from 'utils/pricing';
import { number } from 'yup';

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
  const [selectedComboId, setSelectedComboId] = useState<number | string>("");
  const [suggestedPrice, setSuggestedPrice] = useState<number | string>("");
  const selectedCombo = combosData.find((combo) => combo.id === selectedComboId);
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

 const handlePricingUpdate = async (newFinancials: PricingType[]) => {
  setUpdatedFinacials(newFinancials);

  if (selectedCombo && selectedCombo.products && newFinancials[0]) {
    const priceInfo = newFinancials[0];

    const productionCosts = selectedCombo.products.map((product) => {
      return Number(product.price) + Number(priceInfo.condominium || 0);
    });

    const totalProductionCost = productionCosts.reduce((acc, cost) => acc + cost, 0);

    const taxMultiplier = 1 - (Number(priceInfo.tax) / 100) + (Number(priceInfo.card_tax) / 100) + (Number(priceInfo.profit) / 100);

    const totalExpenses = totalProductionCost + Number(priceInfo.delivery_price || 0);

    const suggestedPrice = Number(totalExpenses / taxMultiplier);
    setSuggestedPrice(suggestedPrice);

    const pricingData = {
      combo: selectedCombo.id,
      tax: Number(priceInfo.tax),
      card_tax: Number(priceInfo.card_tax),
      other: Number(priceInfo.other) || 0,
      profit: Number(priceInfo.profit),
      condominium: Number(priceInfo.condominium) || 0,
      delivery_price: Number(priceInfo.delivery_price) || 0,
      suggested_price: suggestedPrice,
    };

    try {
      const response = await setPricing(pricingData);
      console.log('Dados enviados com sucesso:', response);
    } catch (error) {
      console.error('Erro ao enviar dados para o banco de dados:', error);
    }
  }
};

  return (
    <Paper
      sx={{
        width: "80%"
      }}
    >
      <div>
      <FormControl sx={{ 
        width: "40%", 
        marginBottom: 2,
        display: "flex",
        alignItems: "end",
        justifyContent: "end",
        
        }}>
        <InputLabel>Selecione o combo</InputLabel>
        <Select
          value={selectedComboId}
          onChange={(event) => setSelectedComboId(event.target.value as number)}
        >
          <MenuItem value="" disabled>
            Selecione um combo
          </MenuItem>
          {combosData.map((combo) => (
            <MenuItem key={combo.id} value={combo.id}>
              {combo.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Custo de Unitario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedCombo && selectedCombo.products.map((product) => (
              <TableRow key={product.id}>
                <TableCell >{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
              </TableRow>
            ))}
            {selectedCombo && (
              <TableRow>
                <TableCell>Custo de produção</TableCell>
                <TableCell>{selectedCombo.price}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      <FinancialComponent onFinancial={handlePricingUpdate} />
      <Grid container>
          <Grid item>
            <Typography
              variant="subtitle1"
              align="right"
              style={{ padding: 16 }}
            >
              Preço Sugerido: {typeof suggestedPrice === 'number' ? formatToBRL(suggestedPrice) : suggestedPrice}
            </Typography>
          </Grid>
        </Grid>
    </Paper>
  );
};

export default AddComboPricing;