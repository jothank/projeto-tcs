import React, { useState } from "react";
import { Button, Modal, Typography, Box, TextField, Divider } from "@mui/material";
import { Form, Formik } from "formik";
import Swal from "sweetalert2";
import { updatePricing } from "services/pricing.service";

const EditPricingModal = ({ pricing, onClose, onUpdated }: any) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(pricing);

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
      <Button onClick={handleOpen}>Editar</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", border: "2px solid #000", boxShadow: 24, p: 4 }}>
          <Typography variant="h6" component="h2">
            Editar Preços
          </Typography>
          <Divider />
          <Formik initialValues={formData} onSubmit={handleUpdate}>
            <Form>
              <TextField label="Condomínio" fullWidth name="condominium" value={formData.condominium} onChange={(e) => setFormData({ ...formData, condominium: e.target.value })} />
              <TextField label="Taxa" fullWidth name="tax" value={formData.tax} onChange={(e) => setFormData({ ...formData, tax: e.target.value })} />
              <TextField label="Taxa do Cartão" fullWidth name="card_tax" value={formData.card_tax} onChange={(e) => setFormData({ ...formData, card_tax: e.target.value })} />
              <TextField label="Outros" fullWidth name="other" value={formData.other} onChange={(e) => setFormData({ ...formData, other: e.target.value })} />
              <TextField label="Lucro" fullWidth name="profit" value={formData.profit} onChange={(e) => setFormData({ ...formData, profit: e.target.value })} />
              <TextField label="Taxa de Entrega" fullWidth name="delivery_price" value={formData.delivery_price} onChange={(e) => setFormData({ ...formData, delivery_price: e.target.value })} />
              <Button type="submit">Editar</Button>
              <Button onClick={handleClose}>Cancelar</Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default EditPricingModal;
