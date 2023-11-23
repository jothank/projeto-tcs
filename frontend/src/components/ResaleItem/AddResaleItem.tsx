import * as React from "react";
import Modal from "@mui/material/Modal";
import { StyleModal } from "components/StyleModal/StyleModal";
import { Typography, Button, Box, Divider } from "@mui/material";
import { ResaleItemInput } from "./InputResaleItem";
import { Form, Formik } from "formik";
import { ResaleItemType } from "types/resaleItem.types";
import { setResaleItem } from "services/resealeItem.service";
import { getErro, getSuccessWarning } from "utils/ModalAlert";
import { ResaleItemValidation } from "utils/validations/validationResaleItem";
import { ButtonContainer } from "components/ButtonContainer/ButtonContainer";

const ResaleItemValues: ResaleItemType = {
  name: "",
  description: "",
  purchase_price: 0,
};

export const AddResaleItem = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleRegister = async (
    AddResaleItem: ResaleItemType,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setResaleItem(
        AddResaleItem.name,
        AddResaleItem.description,
        AddResaleItem.purchase_price
      );
      handleClose();
      getSuccessWarning("Resale Item registered Succesfully");
    } catch (error: any) {
      getErro(error.message);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        <Typography variant="subtitle2">Adicionar</Typography>
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
          <Formik
            initialValues={ResaleItemValues}
            validationSchema={ResaleItemValidation}
            onSubmit={handleRegister}
          >
            <Form>
              <ResaleItemInput name="name" label="Nome" type="text" />
              <ResaleItemInput
                name="description"
                label="Descrição"
                type="text"
              />
              <ResaleItemInput
                name="purchase_price"
                label="Preço de compra"
                type="text"
              />
              <ButtonContainer>
                <Button variant="outlined" onClick={handleClose}>
                  Fechar
                </Button>
                <Button variant="contained" type="submit">
                  Cadastrar
                </Button>
              </ButtonContainer>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default AddResaleItem;
