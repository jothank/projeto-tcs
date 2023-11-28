import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { getCombos } from 'services/combo.service';
import FinancialComponent from './FinancialComponent';
import { PricingType } from 'types/pricing.types';
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
      const productionCost =
        Number(selectedCombo.price) +
        Number(priceInfo.condominium || 0) +
        Number(priceInfo.delivery_price || 0);
      let taxMultiplier =
        1 -
        ((priceInfo.tax / 100) +
          (priceInfo.card_tax / 100) +
          (priceInfo.profit / 100));

      if (priceInfo.other !== undefined) {
        taxMultiplier += priceInfo.other / 100;
      }

      const suggestedPrice = Number(productionCost / taxMultiplier);
      setSuggestedPrice(suggestedPrice);

      const pricingData = {
        combo: selectedCombo.id,
        tax: priceInfo.tax,
        card_tax: priceInfo.card_tax,
        other: priceInfo.other || 0,
        profit: priceInfo.profit,
        condominium: priceInfo.condominium || 0,
        delivery_price: priceInfo.delivery_price || 0,
        suggested_price: suggestedPrice,
      };

      try {
        const response = await setPricing(pricingData);
        console.log('Dados enviados com sucesso:', response);
      } catch (error) {
        console.error(
          'Erro ao enviar dados para o banco de dados:',
          error
        );
      }
    }
  };

  return (
    <Grid container sx={{ width: "80%" }}>
      <Paper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <Typography variant="h6" component="div">
            {selectedCombo
              ? selectedCombo.name
              : "Nenhum combo selecionado"}
          </Typography>

          <FormControl
            sx={{ width: "40%" }}
          >
            <InputLabel>Selecione o combo</InputLabel>
            <Select
              value={selectedComboId}
              onChange={(event) =>
                setSelectedComboId(event.target.value as number)
              }
            >
              {combosData.map((combo) => (
                <MenuItem key={combo.id} value={combo.id}>
                  {combo.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Custo de Unitario</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedCombo &&
                  selectedCombo.products.map((product, index) => (
                    <TableRow
                      key={product.id}
                      sx={{
                        backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                      }}
                    >
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{formatToBRL(product.price)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {selectedCombo && (
            <>
              <Typography
                variant="subtitle1"
                align="right"
                style={{ padding: 16 }}
              >
                Custo de produção: {formatToBRL(selectedCombo.price)}
              </Typography>
            </>
          )}
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
    </Grid>
  );
};

export default AddComboPricing;
