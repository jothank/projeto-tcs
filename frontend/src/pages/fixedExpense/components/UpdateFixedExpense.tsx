import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Grid, TextField } from '@mui/material'
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { IFixedExpense, listAllFixedExpense, updateFixedExpense } from 'services/fixedExpense.service';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  heigth: 700,
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

type UpdateFixedExpenseProps = {
  customTitle: string;
  open: boolean;
  onClose: () => void;
  fixedExpense: IFixedExpense | null; // Alterado para aceitar null
};

export default function UpdateFixedExpense({ customTitle, open, onClose, fixedExpense }: UpdateFixedExpenseProps) {
  const methods = useForm<FormValues>();
  const formValues = methods.watch();
  const { setError } = methods;
  const [addError, setEditError] = useState<{ [key: string]: string } | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const { name, value, description, date } = formValues;
    const isAnyFieldEmpty = !name || !value || !description || !date;
    setIsButtonDisabled(isAnyFieldEmpty);
  }, [formValues]);

  useEffect(() => {
    if (open && fixedExpense) {
      methods.reset(fixedExpense);
    }
  }, [open, fixedExpense, methods.reset]);



  const handleUpdateFixedExpense = async (fixedExpense: IFixedExpense) => {
    try {
      await updateFixedExpense(fixedExpense.id, fixedExpense); // Substitua com a função apropriada
      console.log('Despesa fixa atualizada com sucesso');
    } catch (error: any) {
      console.error('Erro ao atualizar despesa fixa:', error);
      const errorMessages: { [key: string]: string } = {};
      // Adicione tratamento de erros aqui, se necessário
      setEditError(errorMessages);
    }
  };

  const handleFormSubmit = async () => {
    try {
      const formData = methods.getValues();
      const updatedFixedExpense: IFixedExpense = {
        ...fixedExpense,
        name: formData.name,
        value: formData.value,
        description: formData.description,
        date: formData.date
      };

      // Adicione validação usando Yup, se necessário
      // await schema.validate(formData, { abortEarly: false });

      handleUpdateFixedExpense(updatedFixedExpense);
      onClose();
    } catch (error) {
      console.error('Erro ao processar o formulário:', error);
      // Adicione tratamento de erros aqui, se necessário
    }
  };

  // Resto do código..


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
          <Grid
            sx={{
              display: 'flex',
              alignItems: 'end',
              justifyContent: 'end',
              marginTop: '3%'
            }}
          >
            <Button onClick={handleClose}>Fechar</Button>
            <Button onClick={handleFormSubmit}>Editar</Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );

}