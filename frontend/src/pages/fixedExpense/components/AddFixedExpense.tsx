import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField, Select, MenuItem, Divider } from "@mui/material"
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { IFixedExpense, addFixedExpense } from 'services/fixedExpense.service';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type FormValues = {
    name: string,
    value: number,
    description: string,
    date: string,
}

export default function AddFixedExpense() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const methods = useForm<FormValues>();
    const { setError } = methods;

    const handleAddFixedExpense = async (fixedExpenseProduct: IFixedExpense) => {
        try {
          await addFixedExpense(fixedExpenseProduct);
          console.log('Produto adicionado com sucesso');
        } catch (error) {
          console.error('Erro ao adicionar Produto:', error);
          // setAddError('erro ao adicionar o usuário')
        }
      };

      const handleFormSubmit = async () => {
        const { name, value, description, date } = methods.getValues();
          const newFixedExpense: IFixedExpense =  {
           
            name: name,
            value: value,
            description: description,
            date: date
          };
    
          try {
            await handleAddFixedExpense(newFixedExpense);
            methods.reset();
            handleClose();
          } catch (error) {
            console.error('Erro ao adicionar produto:', error);
           setError('name', {type: 'manual', message: 'Nome Inválido'});
       
          }
        };

    return (
        <div>
            <Button onClick={handleOpen} variant='contained'>Adicionar</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Cadastro de Fixed Expense
                    </Typography>
                    <Divider />
                    <Grid container
                        sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            // gap: '20px',
                            marginTop: '5%',
                        }}
                    >
                        <Grid item
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px'
                            }}
                        >
                            <FormProvider {...methods}

                            >
                                <Controller
                                    name="name"
                                    control={methods.control}
                                    render={({ field }) => (

                                        <TextField label="Nome" placeholder="Nome" helperText="" {...field} sx={{ width: "100%" }} />
                                    )}

                                />
                                <Controller
                                    name="value"
                                    control={methods.control}
                                    render={({ field }) => (
                                        <TextField label="Valor" placeholder="Valor" helperText="" {...field} sx={{ width: "100%" }} />
                                    )}
                                />
                                <Controller
                                    name="description"
                                    control={methods.control}
                                    render={({ field }) => (
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Descrição"
                                            multiline
                                            rows={4}
                                            placeholder="Descrição"
                                            helperText="" {...field} sx={{ width: "100%" }} />
                                    )}
                                />
                                <Controller
                                    name="date"

                                    control={methods.control}
                                    render={({ field }) => (
                                        <TextField label="Data" placeholder="Insira a data aqui" helperText="" {...field} sx={{ width: "100%" }} />
                                    )}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                    <Grid
                        sx={{
                            display: 'flex',
                            alignItems: 'end',
                            justifyContent: 'end',
                            marginTop: '5%',
                            gap: '10px'
                        }}
                        >
                            <Button variant='outlined' onClick={handleClose}>
                                <Typography>Fechar</Typography>
                                </Button>
                            <Button variant='contained' onClick={handleFormSubmit} >
                                <Typography>Adicionar</Typography>
                            </Button>
                        </Grid>
                </Box>
            </Modal>
        </div>
    );

}