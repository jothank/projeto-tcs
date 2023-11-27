import React, { useState } from "react";
import { Button, Modal, Typography, Box, TextField, Divider, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import Swal from "sweetalert2";
import { updatePricing } from "services/pricing.service";
import EditIcon from "@mui/icons-material/Edit"
import { PricingValidation } from "utils/validations/validationPricing";
import { PricingtemInput } from "./InputPricing";

const EditPricingModal = ({ pricing, onClose, onUpdated }: any) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      window.location.reload();
    } catch (error) {
      console.error("Erro ao editar item", error);
      handleClose();
      Swal.fire("Erro", "Ocorreu um erro ao editar o item.", "error");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}><EditIcon /></Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", border: "2px solid #000", boxShadow: 24, p: 4 }}>
          <Formik 
            initialValues={pricing} 
            validationSchema={PricingValidation}
            onSubmit={handleUpdate}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginTop: "10px"
                  }}
                >
                  <PricingtemInput label="Condomínio"  name="condominium" type="text" value={values.condominium} onChange={(e) => setFieldValue("condominium", e.target.value)} />
                  <PricingtemInput label="Taxa"  name="tax"  type="text" value={values.tax} onChange={(e) => setFieldValue("tax", e.target.value)} />
                  <PricingtemInput label="Taxa do Cartão" name="card_tax"  type="text" value={values.card_tax} onChange={(e) => setFieldValue("card_tax", e.target.value)} />
                  <PricingtemInput label="Outros"  name="other" type="text" value={values.other} onChange={(e) => setFieldValue("other", e.target.value)} />
                  <PricingtemInput label="Lucro"  name="profit" type="text" value={values.profit} onChange={(e) => setFieldValue("profit", e.target.value)} />
                  <PricingtemInput label="Taxa de Entrega"  name="delivery_price" type="text" value={values.delivery_price} onChange={(e) => setFieldValue("delivery_price", e.target.value)} />
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "end",
                    justifyContent: "end",
                    marginTop: "2%",
                    gap: "10px"
                  }}
                >
                  <Button onClick={handleClose} variant="outlined">Cancelar</Button>
                  <Button type="submit" variant="contained">Editar</Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default EditPricingModal;