import React, { useState, useEffect } from "react";
import { Divider, Modal, Typography, Button, Box } from "@mui/material";
import { StyleModal } from "components/StyleModal/StyleModal";
import EditIcon from "@mui/icons-material/Edit";
import { ResaleItemInput } from "./InputResaleItem";
import { Form, Formik } from "formik";
import { ResaleItemType } from "types/resaleItem.types";
import { ResaleItemValidation } from "utils/validations/validationResaleItem";
import { updateResealeItem } from "services/resealeItem.service";
import { getErro, getSuccess } from "utils/ModalAlert";
import { ButtonContainer } from "components/ButtonContainer/ButtonContainer";

export const EditResaleItem = ({
  item,
  onClose,
}: {
  item: ResaleItemType;
  onClose: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ResaleItemType>(item);

  useEffect(() => {
    setFormData(item);
  }, [item]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleUpdate = async (values: ResaleItemType) => {
    try {
      updateResealeItem(
        values.id || 0,
        values.name,
        values.description,
        values.purchase_price
      );
      getSuccess("Resale Item registered Successfully");
      handleClose();
    } catch (error: any) {
      getErro(error.message);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <EditIcon style={{ cursor: "pointer", color: "black" }} />
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
            initialValues={formData}
            validationSchema={ResaleItemValidation}
            onSubmit={handleUpdate}
          >
            <Form>
              <ResaleItemInput name="name" label="nome" type="text" />
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
                  Editar
                </Button>
              </ButtonContainer>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};
