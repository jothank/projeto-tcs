import React, { useEffect, useState } from "react";
import { Box, Button, Modal, Typography, Divider } from "@mui/material";
import { Form, Formik } from "formik";
import { PricingValidation } from "utils/validations/validationPricing";
import Swal from "sweetalert2";
import { updatePricing } from "services/pricing.service";
import { ButtonContainer } from "components/ButtonContainer/ButtonContainer";
import { PricingtemInput } from "components/Pricing/InputPricing";
import EditIcon from "@mui/icons-material/Edit"
const EditPricing = ({ pricing, onClose, onUpdated }: any) => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(pricing);

  useEffect(() => {
    setFormData(pricing);
  }, [pricing]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleUpdate = async (values: any) => {
    try {
      await updatePricing({
        id: pricing.id,
        condominium: values.condominium,
        tax: values.tax,
        card_tax: values.card_tax,
        other: values.other,
        profit: values.profit,
        delivery_price: values.delivery_price,
      });

      handleClose();
      onUpdated?.(values);
      Swal.fire("Editado!", "O item foi editado com sucesso.", "success");
    } catch (error) {
      console.error("Erro ao editar item", error);
      Swal.fire("Erro", "Ocorreu um erro ao editar o item.", "error");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <EditIcon style={{ cursor: "pointer", marginRight: "10px", color: "blue" }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography variant="h6" component="h2">
            Editar Preços
          </Typography>
          <Divider />
          <Formik
            initialValues={formData}
            validationSchema={PricingValidation}
            onSubmit={handleUpdate}
          >
            <Form>
              <PricingtemInput name="condominium" label="Condomínio" type="text" />
              <PricingtemInput name="tax" label="Taxa" type="text" />
              <PricingtemInput name="card_tax" label="Taxa do cartão" type="text" />
              <PricingtemInput name="other" label="Outros" type="text" />
              <PricingtemInput name="profit" label="Lucro" type="text" />
              <PricingtemInput name="delivery_price" label="Taxa de entrega" type="text" />
              <ButtonContainer>
                <Button onClick={handleClose}>Cancelar</Button>
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

export default EditPricing;
