import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { StyleModal } from 'components/StyleModal/StyleModal';
import { FeedStockType } from 'types/FeedStock.type';
import EditIcon from "@mui/icons-material/Edit";
import { Divider } from '@mui/material';
import { FeedStockInput } from './InputFeedStock';
import { Form, Formik } from 'formik';
import { getErro, getSuccess } from 'utils/ModalAlert';
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

  const handleUpdate = async (values: FeedStockType ) => {
    try {
      await updateResealeItem(
        values.id || 0,
        values.name,
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
           validationSchema={ResaleItemValidation}
           onSubmit={handleUpdate}
          >
            <Form >
         <FeedStockInput name='name' label='Nome' type='text' />
         <FeedStockInput name='price' label='Preço' type='text' />
         <FeedStockInput name='unity' label='Unidade' type='text' />
         </Form>
         </Formik>
        </Box>
      </Modal>
    </div>
  );
}

export default EditFeedStock;