import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { Grid } from '@mui/material';


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

const currencies = [
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


export default function AddFeedStock() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              width: '100%'
            }}
            >
              <TextField id="outlined-basic" label="Nome" variant="outlined" fullWidth />
            </Grid>
            <Grid item
              sx={{
                width: '100%'
              }}
            >
              <TextField id="outlined-basic" label="Quantidade" variant="outlined" fullWidth />
            </Grid>
            <Grid item
             sx={{
              width: '100%'
            }}
            >
              <div style={{ width: '100%' }}>
              <TextField
                id="outlined-select-currency"
                select
                label="Selecione a unidade"
                defaultValue="selecione a unidade"
                fullWidth
               
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}

              </TextField>
              </div>
            </Grid>
            <Grid item>
              <FormControl >
                <InputLabel htmlFor="outlined-adornment-amount">Preço</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                  label="Amount"
                />
              </FormControl>

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
            <Button variant="contained">
              Adicionar
            </Button>
          </Grid>
          </Grid>
        </Box>

      </Modal>
    </div>
  );
}