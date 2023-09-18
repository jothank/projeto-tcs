import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Divider, Grid, TextField} from '@mui/material'
import { Controller, FormProvider, useForm } from 'react-hook-form';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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

export default function UpdateFixedExpense() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const methods = useForm<FormValues>();
    const { setError } = methods;

    
    return (
      <div>
        <Button onClick={handleOpen} variant="text">
            <Typography>Editar</Typography>
            </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Atualizar Fixed Expense
            </Typography>
           <Divider />
           <Grid container
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
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
          </Box>
        </Modal>
      </div>
    );

}