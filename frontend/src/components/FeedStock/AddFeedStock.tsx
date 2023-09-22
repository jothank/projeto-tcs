import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { StyleModal } from 'components/StyleModal/StyleModal';
import { Formik } from 'formik';
import {Divider} from '@mui/material'
import { FeedStockType } from 'types/FeedStock.type';
import { FeedStockValidation } from 'utils/validationFeedStock';

const FeedStockValues: FeedStockType = {
  name: "",
  price: 0,
  quantity: 0,
  unity: ""
};

export const AddFeedStock = () => {
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>
      <Button onClick={handleOpen} variant='contained'>Adicionar</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={StyleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Adicionar insumo
          </Typography>
          <Divider />
          <Formik
            initialValues={FeedStockValues}
            validationSchema={FeedStockValidation}
            onSubmit={handleUpdate}
          ></Formik>
        </Box>
      </Modal>
    </div>
  );
}