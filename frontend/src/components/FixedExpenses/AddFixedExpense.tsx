import  React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { StyleModal } from 'components/StyleModal/StyleModal';
import { Form, Formik } from 'formik';
import { FixedExpenseType } from 'types/FixedExpenses.type';
import { FixedExpenseInput } from './InputFixedExpense';
import { ButtonContainer } from 'components/ButtonContainer/ButtonContainer';
import { Divider, Grid } from '@mui/material';

const fixedExpenseValues: FixedExpenseType = {
  date: '',
  name: '',
  value: 0,
  description: '',
  total_value: 0
} 

const AddFixedExpense = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
          <Button onClick={handleOpen} variant='contained'>Adicionar Gastos</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={StyleModal}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Gastos fixos
              </Typography>
              <Divider />
             <Formik
             initialValues={fixedExpenseValues}
             onSubmit={handleOpen}
             >
             <Form>
                <FixedExpenseInput name='name' label='Nome' type='text' />
                <FixedExpenseInput name='value' label='Valor' type='text' />
                <FixedExpenseInput name='description' label='Descrição' type='text' />
                <FixedExpenseInput name='date' label='Data' type='text' />
                <Typography variant='subtitle2'>Ou adicione todos os gastos aqui:</Typography>
                <FixedExpenseInput name='total_value' label='Valor Total' type='text' />
                <Grid sx={{marginTop: '2%'}}>
                <ButtonContainer>
                  <Button variant='outlined' onClick={handleClose}>Fechar</Button>
                  <Button variant='contained'>Adicionar</Button>
                </ButtonContainer>
                </Grid>
                </Form>
             </Formik>
            </Box>
          </Modal>
        </div>
      );
    }


export default AddFixedExpense;