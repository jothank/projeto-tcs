import React, { useEffect, useState } from 'react';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { deletePricing, getPricing } from 'services/pricing.service';
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import EditPricingModal from './EditPricing';
import { ProductPricingType } from 'types/pricing.types';
import { formatToBRL } from "utils/pricing";

const PricingHistory = () => {
  const [pricingData, setPricingData] = useState<ProductPricingType[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<ProductPricingType | null>(null);
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

  const handleDeletePricing = async (pricing: ProductPricingType) => {
    Swal.fire({
      title: 'Tem certeza de que deseja excluir este item?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePricing(pricing.id);
          const updatedPricingData = pricingData.filter(
            (item) => item.id !== pricing.id
          );
          setPricingData(updatedPricingData);
          Swal.fire('Excluído!', 'O item foi excluído com sucesso.', 'success');
        } catch (error) {
          console.error('Erro ao excluir item', error);
          Swal.fire('Erro', 'Ocorreu um erro ao excluir o item.', 'error');
        }
      } else {
        Swal.fire('Cancelado', 'O item não foi excluído.', 'error');
      }
    });
  };


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
              {pricingData.map((pricing, index) => (
                <TableRow key={`${pricing.id} - ${index}`}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff"
                  }}
                >
                  <TableCell>{pricing.product?.name || pricing.combo?.name}</TableCell>
                  <TableCell>{formatToBRL(pricing.product?.price || pricing.combo?.price)}</TableCell>
                  <TableCell>{pricing.condominium}</TableCell>
                  <TableCell>{pricing.tax}</TableCell>
                  <TableCell>{pricing.card_tax}</TableCell>
                  <TableCell>{pricing.other}</TableCell>
                  <TableCell>{pricing.profit}</TableCell>
                  <TableCell>{pricing.delivery_price}</TableCell>
                  <TableCell>{formatToBRL(pricing.suggested_price)}</TableCell>
                  <TableCell>
                    <Grid
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <Button onClick={() => handleDeletePricing(pricing)}>
                        <DeleteIcon sx={{ color: 'red' }} />
                      </Button>
                      <EditPricingModal
                        pricing={pricing}
                        setSelectedPricing={setSelectedPricing}
                      />
                    </Grid>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid >
  );
};

export default PricingHistory;