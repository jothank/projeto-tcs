import React, { useEffect, useState } from 'react';
import {FormControl, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material'
import { getPricing } from 'services/pricing.service';
import { PricingType } from 'types/pricing,types';


export const PricingHistory = () => {
    const [pricingData, setPricingData] = useState<PricingType[]>([]);

    useEffect(()=> {
       const fetchPricing = async () => {
        try {
            const pricingData = await getPricing();
            console.log(pricingData)
        } catch {

        }
       }
       fetchPricing();
    }, [])


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
              {/* <InputLabel>Selecione o combo</InputLabel>
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
              </Select> */}
            </FormControl>
      
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Produto</TableCell>
                    <TableCell>Condominio</TableCell>
                    <TableCell>Imposto</TableCell>
                    <TableCell>Cartão Débito/Crédito</TableCell>
                    <TableCell>Outros</TableCell>
                    <TableCell>Lucro</TableCell>
                    <TableCell>Entrega</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
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
                </TableBody> */}
              </Table>
            </TableContainer>
            </div>
           
          </Paper>
        );
}

export default PricingHistory;