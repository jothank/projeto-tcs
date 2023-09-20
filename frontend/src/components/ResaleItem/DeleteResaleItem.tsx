import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { StyleModal } from 'components/StyleModal/StyleModal';
import DeleteIcon from '@mui/icons-material/Delete'; 

export const DeleteResaleItem = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
          <Button onClick={handleOpen}>
            <DeleteIcon
              style={{ cursor: 'pointer', marginRight: '10px', color: 'red' }}
            />
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={StyleModal}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Deletar
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Você deseja realmente deletar o produto?
              </Typography>
            </Box>
          </Modal>
        </div>
      );
}

export default DeleteResaleItem;
