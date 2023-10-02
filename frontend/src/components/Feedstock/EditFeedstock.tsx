import React, { useEffect, useState } from "react";
import { Divider, Box, Button, Typography, Modal } from "@mui/material";
import { StyleModal } from "components/StyleModal/StyleModal";
import { FeedstockType } from "types/Feedstock.type";
import EditIcon from "@mui/icons-material/Edit";
import { FeedstockInput } from "components/Feedstock/InputFeedstock";
import { FeedstockSelect } from "components/SelectOptions/SelectOptions";
import { Form, Formik } from "formik";
import { getErro, getSuccessWarning } from "utils/ModalAlert";
import { FeedstockValidation } from "utils/validations/validationFeedstock";
import { options } from "utils/FeedstockUnit";
import { updatefeedstock } from "services/feedstock.service";
import { ButtonContainer } from "components/ButtonContainer/ButtonContainer";
import { calculateAdjustedPriceAndQuantity } from "utils/calculations/pricing";
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
      const adjustedFeedstock = calculateAdjustedPriceAndQuantity(values);
      await updatefeedstock(
        adjustedFeedstock.id || 0,
        adjustedFeedstock.name,
        adjustedFeedstock.price,
        adjustedFeedstock.quantity,
        adjustedFeedstock.unit
      );
      handleClose();
      getSuccessWarning("Item atualizado com sucesso");
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
