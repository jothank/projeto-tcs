import * as React from 'react';
import {Divider, Modal, Typography, Button, Box, Grid } from '@mui/material'
import { StyleModal } from 'components/StyleModal/StyleModal';
import EditIcon from '@mui/icons-material/Edit'; 
import { ResaleItemInput } from './InputResaleItem';
import { Form, Formik } from 'formik';
import { ResaleItemType } from 'types/resaleItem.types';
import { ResaleItemValidation } from 'utils/validationResaleItem';
import { setResaleItem } from 'services/resealeItem.service';
import { getErro, getSuccess } from 'utils/ModalAlert';
import { ButtonContainer } from 'components/ButtonContainer/ButtonContainer';

const ResaleItemValues: ResaleItemType = {
  name: "",
  description: "",
  purchase_price: 0,
}

export const EditResaleItem = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const handleUpdate = async (
      AddResaleItem: ResaleItemType,
      { resetForm }: { resetForm: () => void }
  ) => {
      try {
          setResaleItem(AddResaleItem.name, AddResaleItem.description, AddResaleItem.purchase_price);
          console.log(AddResaleItem)
          getSuccess("Resale Item registered Succesfully");
      } catch (error: any) {
          getErro(error.message)
      }
  }


    return (
      <div>
        <Button onClick={handleOpen}>
          <EditIcon
            style={{ cursor: 'pointer', color: 'black' }}
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
              Editar Produto
            </Typography>
            <Divider />
            <Formik
             initialValues={ResaleItemValues}
             validationSchema={ResaleItemValidation}
             onSubmit={handleUpdate}
            >
              <Form>
            <ResaleItemInput name='name' label='nome' type='text' />
            <ResaleItemInput name='description' label='Descrição' type='text' />
            <ResaleItemInput name='purchase_price' label='Preço de compra' type='text' />
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

export default EditResaleItem;
