import React, { useEffect, useRef, useState } from "react";
import { getAllfeedstocks } from "services/feedstock.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TableContainer,
  Grid,
} from "@mui/material";
import { formatToBRL } from "utils/pricing";
import { ProductTableProps } from "types/Product.types";
import FinancialComponent from "./FinancialComponent";
import { PricingType } from "types/pricing.types";
import { getPricing, setPricing } from "services/pricing.service";
import { FeedstockType } from "types/Feedstock.type";

export const AddProductPricing = ({ data }: ProductTableProps) => {
  const componentRef = useRef(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    data?.results.length ? data.results[0].id : null
  );
  const selectedProduct = data.results.find(
    (product) => product.id === selectedProductId
  );
  const [suggestedPrice, setSuggestedPrice] = useState<number | string>(0);
  const [updatedFinancials, setUpdatedFinacials] = useState<PricingType[]>([]);
  const [feedstockList, setFeedstockList] = useState<FeedstockType[]>([]);

  useEffect(() => {
    const fetchFeedstocks = async () => {
      try {
        const result = await getAllfeedstocks();
        setFeedstockList(result);
      } catch (error) {
        console.error("Failed to fetch feedstocks:", error);
      }
    };
    fetchFeedstocks();
  }, []);

  const handlePricingUpdate = async (newFinancials: PricingType[]) => {
    setUpdatedFinacials(newFinancials);

    if (selectedProduct) {
      const priceInfo = newFinancials[0];

      const productionCost = Number(selectedProduct.price) + Number(priceInfo.condominium || 0) + Number(priceInfo.delivery_price || 0);

      let taxMultiplier = 1 - ((priceInfo.tax / 100) + (priceInfo.card_tax / 100) + (priceInfo.profit / 100));

      if (priceInfo.other !== undefined) {
        taxMultiplier += priceInfo.other / 100;
      }

      const suggestedPrice = Number(productionCost / taxMultiplier);

      setSuggestedPrice(suggestedPrice);

      const pricingData = {
        product: selectedProduct.id || 0,
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
        console.error('Erro ao enviar dados para o banco de dados:', error);
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
            {selectedProduct
              ? selectedProduct.name
              : "Nenhum produto selecionado"}
          </Typography>

          <FormControl sx={{ width: "40%" }}>
            <InputLabel>Selecione o produto</InputLabel>
            <Select
              value={selectedProductId || ""}
              onChange={(event) =>
                setSelectedProductId(event.target.value as number)
              }
            >
              {data.results.map((productItem) => (
                <MenuItem key={productItem.id} value={productItem.id}>
                  {productItem.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div ref={componentRef}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Insumo</TableCell>
                  <TableCell align="center">Unidade de Fabricação</TableCell>
                  <TableCell align="center">Quantidade de uso</TableCell>
                  <TableCell align="center">Unidade de aquisição</TableCell>
                  <TableCell align="center">Valor de aquisição</TableCell>
                  <TableCell align="center">Valor unitário</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedProduct ? (
                  selectedProduct.supplies.map((product, index) => (
                    <TableRow
                      key={`${product.id}-${index}`}
                      sx={{
                        backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff"
                      }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {product.feedstock.name}
                      </TableCell>
                      <TableCell align="center">{product.unit}</TableCell>
                      <TableCell align="center">{product.quantity}</TableCell>
                      <TableCell align="center">
                        {product.feedstock.unit}
                      </TableCell>
                      <TableCell align="center">
                        {formatToBRL(product.feedstock.price)}
                      </TableCell>
                      <TableCell align="center">
                        {formatToBRL(product.price)}
                      </TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      Nenhum produto selecionado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {selectedProduct && (
            <>
              <Typography
                variant="subtitle1"
                align="right"
                style={{ padding: 16 }}
              >
                Custo de produção: {formatToBRL(selectedProduct.price)}
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
              <Typography
                variant="subtitle1"
                align="right"
                style={{ padding: 16 }}
              >
                Preço Sugerido: {typeof suggestedPrice === 'number' ? suggestedPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : formatToBRL(Number(suggestedPrice))}
              </Typography>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
