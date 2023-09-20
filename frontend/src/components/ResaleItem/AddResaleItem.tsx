import * as React from 'react';
import Modal from '@mui/material/Modal';
import { StyleModal } from 'components/StyleModal/StyleModal';
import {Typography, Button, Box, Divider } from '@mui/material'

export const AddResaleItem = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <div>
        <Button onClick={handleOpen} variant='contained' >
        <Typography variant='subtitle2'>Adicionar</Typography>
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={StyleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Adicionar Item de Revenda
            </Typography>
            <Divider />
            
          </Box>
        </Modal>
      </div>
    );

}

export default AddResaleItem;