import React, { useState } from 'react';
import {
  Divider,
  Box,
  Button,
  Typography,
  Modal
} from '@mui/material';
import { StyleModal } from 'components/StyleModal/StyleModal';
import { FeedStockType } from 'types/FeedStock.type';
import EditIcon from "@mui/icons-material/Edit";
import { FeedStockInput, FeedStockSelect } from './InputFeedStock';
import { Form, Formik } from 'formik';
import { getErro, getSuccess } from 'utils/ModalAlert';
import { FeedStockValidation } from 'utils/validationFeedStock';
import { options } from './FeedStockUnity';
import { updateFeedStock } from 'services/feedStock.service';
import { ButtonContainer } from 'components/ButtonContainer/ButtonContainer';
export const EditFeedStock = ({
  item,
  onClose,
}: {
  item: FeedStockType;
  onClose: () => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  const [formData, setFormData] = useState<FeedStockType>(item);

  const handleUpdate = async (values: FeedStockType) => {
    try {
      await updateFeedStock(
        values.id || 0,
        values.name,
        values.price,
        values.quantity,
        values.unity
      );
      window.location.reload();
      getSuccess("Resale Item registered Successfully");
      handleClose();
    } catch (error: any) {
      getErro(error.message);
    }
  };


  return (
    <div>
      <Button onClick={handleOpen}> <EditIcon style={{ cursor: "pointer", color: "black" }} /></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={StyleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Editar Insumos
          </Typography>
          <Divider />
          <Formik
            initialValues={formData}
            validationSchema={FeedStockValidation}
            onSubmit={handleUpdate}
          >
            <Form >
              <FeedStockInput name='name' label='Nome' type='text' />
              <FeedStockInput name='price' label='Preço' type='text' />
              <FeedStockInput name='quantity' label='Quantidade' type='text' />
              <FeedStockSelect name='unity' label='Unidade' options={options} />
              <ButtonContainer>
                <Button variant='outlined' onClick={handleClose}>Fechar</Button>
                <Button variant='contained' type='submit'>Editar</Button>
              </ButtonContainer>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}

export default EditFeedStock;