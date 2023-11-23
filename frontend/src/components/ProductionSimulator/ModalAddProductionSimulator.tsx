import React, { useEffect } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { FormInput } from "components/FormGroup";
import { getPricing } from "services/pricing.service";
import { PricingType } from "./ProductionSimulatorTable";

export interface AddFixedExpensesProps {
  open: boolean;
  onClose: () => void;
  pricings: PricingType[];
}

const validationSchema = Yup.object().shape({
  productionQuantity: Yup.number()
    .typeError("Deve ser um número")
    .required("Campo obrigatório")
    .positive("Deve ser um valor positivo"),
  productId: Yup.string()
    .required("Campo obrigatório")
    .test("is-valid-id", "Seleção inválida", (value) => {
      return value !== "";
    }),
});

const ModalAddProductionSimulator: React.FC<AddFixedExpensesProps> = ({
  open,
  onClose,
  pricings,
}) => {
  const initialValues = {
    productionQuantity: 0,
    productId: "",
  };

  const handleSubmit = (
    values: any,
    { resetForm }: { resetForm: () => void }
  ) => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Criar simulação</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors, touched, values }) => (
            <Form>
              <FormControl>
                <FormInput
                  name="productionQuantity"
                  label="Quantidade de produção"
                  type="text"
                />
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel id="pricing-select-label">Produto</InputLabel>
                <Select
                  labelId="pricing-select-label"
                  name="productId"
                  onChange={(e) => setFieldValue("productId", e.target.value)}
                  value={values.productId}
                  displayEmpty
                >
                  {Array.isArray(pricings) &&
                    pricings.map((pricing) => (
                      <MenuItem key={pricing.id} value={pricing.id}>
                        {pricing.product?.name || pricing.combo?.name}
                      </MenuItem>
                    ))}
                </Select>
                {touched.productId && errors.productId && (
                  <FormHelperText error={true}>
                    {errors.productId}
                  </FormHelperText>
                )}
              </FormControl>
              <DialogActions>
                <Button onClick={onClose} color="primary">
                  Cancelar
                </Button>
                <Button variant="contained" type="submit" color="primary">
                  Salvar
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddProductionSimulator;
