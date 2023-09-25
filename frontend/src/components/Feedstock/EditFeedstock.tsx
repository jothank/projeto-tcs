import React, { useEffect, useState } from "react";
import { Divider, Box, Button, Typography, Modal } from "@mui/material";
import { StyleModal } from "components/StyleModal/StyleModal";
import { FeedstockType } from "types/Feedstock.type";
import EditIcon from "@mui/icons-material/Edit";
import {
  FeedstockInput,
  FeedstockSelect,
} from "components/Feedstock/InputFeedstock";
import { Form, Formik } from "formik";
import { getErro, getSuccess } from "utils/ModalAlert";
import { FeedstockValidation } from "utils/validations/validationFeedstock";
import { options } from "components/Feedstock/FeedstockUnit";
import { updatefeedstock } from "services/feedstock.service";
import { ButtonContainer } from "components/ButtonContainer/ButtonContainer";
export const EditFeedstock = ({
  item,
  onClose,
}: {
  item: FeedstockType;
  onClose: () => void;
}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  const [formData, setFormData] = useState<FeedstockType>(item);

  useEffect(() => {
    setFormData(item);
  }, [item]);

  const handleUpdate = async (values: FeedstockType) => {
    try {
      await updatefeedstock(
        values.id || 0,
        values.name,
        values.price,
        values.quantity,
        values.unit
      );
      getSuccess("Resale Item registered Successfully");
      handleClose();
  
      window.location.reload();
    } catch (error: any) {
      getErro(error.message);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        {" "}
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
            Editar Insumos
          </Typography>
          <Divider />
          <Formik
            initialValues={formData}
            validationSchema={FeedstockValidation}
            onSubmit={handleUpdate}
          >
            <Form>
              <FeedstockInput name="name" label="Nome" type="text" />
              <FeedstockInput name="price" label="Preço" type="text" />
              <FeedstockInput name="quantity" label="Quantidade" type="text" />
              <FeedstockSelect name="unit" label="Unidade" options={options} />
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

export default EditFeedstock;
