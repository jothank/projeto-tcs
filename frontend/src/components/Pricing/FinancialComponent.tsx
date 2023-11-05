import React from 'react';
import {  TextField, Grid, Typography, Button } from '@mui/material';
 
const FinancialComponent: React.FC = () => {
  return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6" color="textSecondary">Valor do Condomínio</Typography>
        </Grid>
        <Grid item xs={6}>
        <TextField fullWidth variant="outlined"  />
        </Grid>
        <Grid item xs={4}>
          <Typography>Imposto</Typography>
          <TextField fullWidth variant="outlined"  />
        </Grid>
        <Grid item xs={4}>
          <Typography>Cartão Débito | Crédito</Typography>
          <TextField fullWidth variant="outlined"  />
        </Grid>
        <Grid item xs={4}>
          <Typography>Outros</Typography>
          <TextField fullWidth variant="outlined"  />
        </Grid>
        <Grid item xs={9}>
          <Typography>Lucro</Typography>
          <TextField fullWidth variant="outlined"  />
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" color="secondary" fullWidth style={{ marginTop: '16px' }}>
            Calcular
          </Button>
        </Grid>
      </Grid>
  );
}
 
export default FinancialComponent;