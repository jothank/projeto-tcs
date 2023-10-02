import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { StyleModal } from "components/StyleModal/StyleModal";
import { Form, Formik } from "formik";
import { Divider } from "@mui/material";
import { FeedstockType } from "types/Feedstock.type";
import { FeedstockValidation } from "utils/validations/validationFeedstock";
import { FeedstockInput } from "components/Feedstock/InputFeedstock";
import { FeedstockSelect } from "components/SelectOptions/SelectOptions";
import { ButtonContainer } from "components/ButtonContainer/ButtonContainer";
import { options } from "utils/FeedstockUnit";
import { getErro, getSuccess } from "utils/ModalAlert";
import { setfeedstock } from "services/feedstock.service";
import { calculateAdjustedPriceAndQuantity } from "utils/calculations/pricing";

const FeedstockValues: FeedstockType = {
  name: "",
  price: 0,
  quantity: 0,
  unit: "",
};

export const AddFeedstock = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRegister = async (
    Addfeedstock: FeedstockType,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const adjustedFeedstock = calculateAdjustedPriceAndQuantity(Addfeedstock);

      setfeedstock(
        adjustedFeedstock.name,
        adjustedFeedstock.price,
        adjustedFeedstock.quantity,
        adjustedFeedstock.unit
      );

      handleClose();
      getSuccess("Resale Item registered Succesfully");
      window.location.reload();
    } catch (error: any) {
      getErro(error.message);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Adicionar
      </Button>
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
            initialValues={FeedstockValues}
            validationSchema={FeedstockValidation}
            onSubmit={handleRegister}
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
                  Adicionar
                </Button>
              </ButtonContainer>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};
