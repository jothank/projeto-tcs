import  React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Grid, Select } from '@mui/material';
import { useForm, FormProvider, Controller} from 'react-hook-form';
import { IFeedStock, updateFeedStock } from 'services/feedStock.service';

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type FormValues = {
  name: string;
  quantity: string;
  units: string;
  value: number;
};

const options = [
  {
    value: 'kg',
    label: 'kg',
  },
  {
    value: 'g',
    label: 'g',
  },
  {
    value: 'mg',
    label: 'mg',
  },
  {
    value: 't',
    label: 't',
  },
  {
    value: 'lb',
    label: 'lb',
  },
  {
    value: 'oz',
    label: 'oz',
  },
  {
    value: 'l',
    label: 'l',
  },
  {
    value: 'ml',
    label: 'ml',
  },
  {
    value: 'gal',
    label: 'gal',
  },
  {
    value: 'pt',
    label: 'pt',
  },
  {
    value: 'qt',
    label: 'qt',
  },
  {
    value: 'floz',
    label: 'floz',
  },
];


export default function UpdatedFeedStock() {
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const methods = useForm<FormValues>();
  const { setError } = methods;
  const formValues = methods.watch();


  const handleUpdateFeedStock = async (feedStockProduct: IFeedStock | undefined) => {
    try {
      if (feedStockProduct) {
      
        await updateFeedStock(feedStockProduct);
        console.log('Produto atualizado com sucesso');
      } else {
        console.error('feedStockProduct é indefinido');
      
      }
    } catch (error) {
      console.error('Erro ao atualizar Produto:', error);
      
    }
  };
  
  
  const handleFormSubmit = async () => {
    const { name, quantity , units, value } = methods.getValues();
    const updateFeedStock: IFeedStock =  {
       
      name: name,
      quantity: parseFloat(quantity) ,
      units: units,
      value: value
    };


    try {
      await handleUpdateFeedStock(updateFeedStock);
      methods.reset();
      handleClose();
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      // Lide com o erro de forma apropriada aqui
      // setError('name', { type: 'manual', message: 'Nome Inválido' })
    }
  };
  

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">Cadastrar</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Cadastro de insumos
          </Typography>
          <Grid container
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '20px',
              marginTop: '5%',
              

            }}
          >
            <Grid item
            sx={{
              width: '100%',
              gap: '3%'
            }}
            >
               <FormProvider {...methods}
            
            >
              <Controller
                name="name"
                control={methods.control}
                render={({ field }) => (
                  
                  <TextField label="Nome" placeholder="Nome" helperText="" {...field}  sx={{width: "100%"}} />
                )}
                
              />
              <Controller
                name="quantity"
                control={methods.control}
                render={({ field }) => (
                  <TextField label="Quantidade" placeholder="Quantidade" helperText="" {...field} sx={{width: "100%"}} />
                )}
              />
              <Controller
                name="value"
                control={methods.control}
                render={({ field }) => (
                  <TextField label="Valor" placeholder="Valor" helperText="" {...field} sx={{width: "100%"}} />
                )}
              />
              <Controller
                name="units"
                
                control={methods.control}
                render={({ field }) => (
                  <Select {...field} labelId="role-label" label="Unidades" 
                  sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  }}>
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value} placeholder="Perfil">
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormProvider>
             
            </Grid>
          </Grid>
          <Grid container spacing={2} 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '3%'
          }}
          >
          <Grid item 
          sx={{
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'end',
            marginLeft: '40%',
           
          }}
          >
            <Button 
            variant="outlined"
           onClick={handleClose}
            >
              Fechar
            </Button>
          </Grid>
          <Grid item >
            <Button variant="contained" onClick={handleFormSubmit}>
              Editar
            </Button>
          </Grid>
          </Grid>
        </Box>

      </Modal>
    </div>
  );
}
