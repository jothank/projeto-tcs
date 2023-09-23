import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { StyleModal } from 'components/StyleModal/StyleModal';
import { Form, Formik } from 'formik';
import {Divider} from '@mui/material'
import { FeedStockType } from 'types/FeedStock.type';
import { FeedStockValidation } from 'utils/validationFeedStock';
import { FeedStockInput, FeedStockSelect } from './InputFeedStock';
import { ButtonContainer } from 'components/ButtonContainer/ButtonContainer';
import { options } from './FeedStockUnity';
import { getErro, getSuccess } from 'utils/ModalAlert';
import { setFeedStock } from 'services/feedStock.service';

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

  const handleRegister = async (
    AddFeedStock: FeedStockType,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setFeedStock(
        AddFeedStock.name,
        AddFeedStock.price,
        AddFeedStock.quantity,
        AddFeedStock.unity
      );
      handleClose();
      window.location.reload();
      getSuccess("Resale Item registered Succesfully");
    } catch (error: any) {
      getErro(error.message);
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
        <Box sx={StyleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Adicionar insumo
          </Typography>
          <Divider />
          <Formik
            initialValues={FeedStockValues}
            validationSchema={FeedStockValidation}
            onSubmit={handleRegister}
          >
            <Form>
            <FeedStockInput name='name' label='Nome' type='text' />
              <FeedStockInput name='price' label='Preço' type='text' />
              <FeedStockInput name='quantity' label='Quantidade' type='text' />
              <FeedStockSelect name='unity' label='Unidade' options={options} />
              <ButtonContainer>
                <Button variant='outlined' onClick={handleClose}>Fechar</Button>
                <Button variant='contained' type='submit'>Adicionar</Button>
              </ButtonContainer>
            </Form>


          </Formik>
        </Box>
      </Modal>
    </div>
  );
}