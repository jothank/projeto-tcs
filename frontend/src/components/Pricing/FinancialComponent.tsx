import React from 'react';
import { TextField, Grid, Typography, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { PricingtemInput } from './InputPricing';
import { PricingValidation } from 'utils/validations/validationPricing';
import { PricingType } from 'types/pricing.types';

const PricingItemValue: PricingType = {
  tax: 0,
  card_tax: 0,
  other: 0,
  profit: 0,
  suggested_price: 0,
  delivery_price: 0,
  condominium: 0,
}

export interface FinancialComponentProps {
  onFinancial: (newFinancials: PricingType[]) => void;
}


const FinancialComponent: React.FC<FinancialComponentProps> = ({
  onFinancial,
}) => {

  return (
    <Formik
      initialValues={PricingItemValue}
      validationSchema={PricingValidation}
      onSubmit={(values) => {
        onFinancial([values])
      }}
    >
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6" color="textSecondary">Valor do Condomínio</Typography>
          </Grid>
          <Grid item xs={6}>
            <PricingtemInput name='condominium' label='Condomínio' type='number' />
          </Grid>
          <Grid item xs={4}>
            <Typography>Imposto</Typography>
            <PricingtemInput name='tax' label='Taxa' type='number' />
          </Grid>
          <Grid item xs={4}>
            <Typography>Cartão Débito | Crédito</Typography>
            <PricingtemInput name='card_tax' label='Taxa do cartão' type='number' />
          </Grid>
          <Grid item xs={4}>
            <Typography>Outros</Typography>
            <PricingtemInput name='other' label='Outros' type='number' />
          </Grid>
          <Grid item xs={4}>
            <Typography>Lucro</Typography>
            <PricingtemInput name='profit' label='Lucro' type='number' />
          </Grid>
          <Grid item xs={4}>
            <Typography>Taxa de entrega</Typography>
            <PricingtemInput name='delivery_price' label='Taxa de entrega' type='number' />
          </Grid>
          <Grid item xs={2}>
            <Button
              sx={{ marginTop: "15%", width: "150px" }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Salvar
            </Button>
          </Grid>

        </Grid>
      </Form>
    </Formik>
  );
}

export default FinancialComponent;