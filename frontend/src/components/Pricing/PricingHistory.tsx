import React, { useEffect, useState, useRef } from 'react';
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { deletePricing, getPricing } from 'services/pricing.service';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import EditPricingModal from './EditPricing';
import { ProductPricingType } from 'types/pricing.types';
import { formatToBRL } from 'utils/pricing';
import { useReactToPrint } from 'react-to-print';
import * as XLSX from 'xlsx';
import PrintIcon from '@mui/icons-material/Print';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const PricingHistory = () => {
  const [pricingData, setPricingData] = useState<ProductPricingType[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<ProductPricingType | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const pricingData = await getPricing();
        console.log(pricingData);
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
          const updatedPricingData = pricingData.filter((item) => item.id !== pricing.id);
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper sx={{ width: '80%' }}>
        <div>
          <TableContainer>
            <Grid container 
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
            >
            <Grid  item sx={{ display: 'flex',  padding: 2 }}>
              <InputLabel sx={{ mr: 1 }}>Selecione um item:</InputLabel>
              <Select
                value={selectedItemId || ''}
                onChange={(e) => setSelectedItemId(e.target.value as number)}
                sx={{width: "250px"}}
              >
                <MenuItem value="">Todos</MenuItem>
                {pricingData.map((pricing) => (
                  <MenuItem key={pricing.id} value={pricing.id}>
                    {pricing.product?.name || pricing.combo?.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            </Grid>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Produto</TableCell>
                  <TableCell align="center">Preço</TableCell>
                  <TableCell align="center">Condomínio</TableCell>
                  <TableCell align="center">Imposto</TableCell>
                  <TableCell align="center">Cartão Débito/Crédito</TableCell>
                  <TableCell align="center">Outros</TableCell>
                  <TableCell align="center">Lucro</TableCell>
                  <TableCell align="center">Entrega</TableCell>
                  <TableCell align="center">Preço Sugerido</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pricingData
                  .filter((pricing) => (selectedItemId ? pricing.id === selectedItemId : true))
                  .map((pricing, index) => (
                    <TableRow
                      key={`${pricing.id} - ${index}`}
                      sx={{
                        backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff',
                      }}
                    >
                      <TableCell align="center">
                        {pricing.product?.name || pricing.combo?.name}
                      </TableCell>
                      <TableCell align="center">
                        {formatToBRL(pricing.product?.price || pricing.combo?.price)}
                      </TableCell>
                      <TableCell align="center">{pricing.condominium}</TableCell>
                      <TableCell align="center">{pricing.tax}</TableCell>
                      <TableCell align="center">{pricing.card_tax}</TableCell>
                      <TableCell align="center">{pricing.other}</TableCell>
                      <TableCell align="center">{pricing.profit}</TableCell>
                      <TableCell align="center">{pricing.delivery_price}</TableCell>
                      <TableCell align="center">{formatToBRL(pricing.suggested_price)}</TableCell>
                      <TableCell align="center">
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
        </div>
      </Paper>
    </Grid>
  );
};

export default PricingHistory;
