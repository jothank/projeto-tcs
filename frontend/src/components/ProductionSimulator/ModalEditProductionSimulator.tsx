import React from "react";
import { Formik, Form } from "formik";
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
import {
  PricingType,
  ProductionSimulatorType,
} from "./ProductionSimulatorTable";
import { updateProductionSimulator } from "services/ProductionSimulator.service";
import { getErro } from "utils/ModalAlert";

export interface AddFixedExpensesProps {
  open: boolean;
  onClose: () => void;
  productionSimulator: ProductionSimulatorType | null;
  pricings: PricingType[];
}

const validationSchema = Yup.object().shape({
  productionQuantity: Yup.number()
    .typeError("Deve ser um número")
    .required("Campo obrigatório")
    .positive("Deve ser um valor positivo"),
  pricingId: Yup.string()
    .required("Campo obrigatório")
    .test("is-valid-id", "Seleção inválida", (value) => {
      return value !== "";
    }),
});

const ModalEditProductionSimulator: React.FC<AddFixedExpensesProps> = ({
  open,
  onClose,
  productionSimulator,
  pricings,
}) => {
  const initialValues = {
    id: productionSimulator?.id || 0,
    productionQuantity: productionSimulator?.production_quantity || 0,
    pricingId: productionSimulator?.pricing.id || "",
  };

  const handleSubmit = async (
    values: any,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      console.log(values);
      const response = await updateProductionSimulator(values);
      resetForm();
      window.location.reload();
    } catch (error) {
      getErro("Erro ao editar simulação");
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar simulação</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors, touched, values }) => (
            <Form>
              <FormControl fullWidth>
                <FormInput
                  name="productionQuantity"
                  label="Quantidade de produção"
                  type="text"
                />
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel>Produto</InputLabel>
                <Select
                  name="pricingId"
                  onChange={(e) => setFieldValue("pricingId", e.target.value)}
                  value={values.pricingId}
                  displayEmpty
                >
                  {Array.isArray(pricings) &&
                    pricings.map((pricing) => (
                      <MenuItem key={pricing.id} value={pricing.id}>
                        {pricing.product?.name || pricing.combo?.name}
                      </MenuItem>
                    ))}
                </Select>
                {touched.pricingId && errors.pricingId && (
                  <FormHelperText error={true}>
                    {typeof errors.pricingId === "string"
                      ? errors.pricingId
                      : ""}
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

export default ModalEditProductionSimulator;
