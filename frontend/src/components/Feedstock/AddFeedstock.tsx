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
import UnitSelect from "components/SelectOptions/SelectOptions";
import { ButtonContainer } from "components/ButtonContainer/ButtonContainer";
import { options } from "utils/FeedstockUnit";
import { getErro, getAddReload } from "utils/ModalAlert";
import { setfeedstock } from "services/feedstock.service";

const FeedstockValues: FeedstockType = {
  name: "",
  price: 0,
  quantity: 0,
  unit: "",
  type: "",
};

export const Types = [
  {
    value: "Feedstock",
    label: "Insumo",
  },
  {
    value: "ResaleItem",
    label: "Item de revenda",
  },
];

export const AddFeedstock = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRegister = async (
    Addfeedstock: FeedstockType,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setfeedstock(
        Addfeedstock.name,
        Addfeedstock.price,
        Addfeedstock.quantity,
        Addfeedstock.unit,
        Addfeedstock.type
      );

      handleClose();
      getAddReload("Resale Item registered Succesfully");
    } catch (error: any) {
      getErro(error.message);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" sx={{ margin: "20px", width: "150px" }}> Adicionar</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={StyleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Adicionar
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
              <UnitSelect name="unit" label="Unidade" options={options} />
              <UnitSelect name="type" label="Tipo" options={Types} />

              <ButtonContainer>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" type="submit">
                  Salvar
                </Button>
              </ButtonContainer>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};
