import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { FieldArray, Formik, Field, Form } from "formik";
import { ProductInput } from "components/Product/InputProduct";
import * as Yup from "yup";
import { setCombo } from "services/combo.service";
import { getSuccess, getErro } from "utils/ModalAlert";

const validationSchema = Yup.object().shape({
  comboName: Yup.string().required("Nome do Combo é obrigatório"),
  products: Yup.array()
    .of(Yup.number().required("Produto é obrigatório"))
    .min(1, "Produtos são obrigatórios")
    .required("Produtos são obrigatórios"),
});

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productsList: any[];
}

const AddProductsModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  productsList,
}) => {
  const [open, setOpen] = useState(isOpen);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleRegister = async (values: any) => {
    try {
      const combo = await setCombo(values.products, values.comboName);
      getSuccess("Combo cadastrado com sucesso");
      setOpen(false);
    } catch (error) {
      getErro("Erro ao cadastrar combo");
      setOpen(false);
    }
  };

  return (
    <Grid>
      <Button variant="outlined" onClick={handleOpen} sx={{ mr: 2 }}>
        Add Product
      </Button>

      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Adicionar combo</DialogTitle>
        <Grid>
          <Formik
            initialValues={{ comboName: "", products: [null] }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            <Form>
              <Grid>
                <ProductInput
                  name="comboName"
                  label="Nome do Combo"
                  type="text"
                />
                <FieldArray name="products">
                  {({ push, remove, form }) => (
                    <>
                      {form.values.products.map(
                        (productId: number, index: number) => (
                          <div key={index}>
                            <Field name={`products.${index}`}>
                              {({ field, meta }: any) => (
                                <FormControl fullWidth margin="dense">
                                  <InputLabel>Produto</InputLabel>
                                  <Select
                                    value={productId || ""}
                                    onChange={(e) => {
                                      field.onChange({
                                        target: {
                                          value: e.target.value,
                                          name: `products.${index}`,
                                        },
                                      });
                                    }}
                                  >
                                    <MenuItem value="" disabled>
                                      Selecione um produto
                                    </MenuItem>
                                    {productsList.map((item) => (
                                      <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                  {meta.touched && meta.error && (
                                    <FormHelperText error={true}>
                                      {meta.error}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              )}
                            </Field>
                            <IconButton onClick={() => remove(index)}>
                              <RemoveIcon />
                            </IconButton>
                          </div>
                        )
                      )}
                      <IconButton onClick={() => push(null)}>
                        <AddIcon />
                      </IconButton>
                    </>
                  )}
                </FieldArray>
              </Grid>
              <Button onClick={() => setOpen(false)}>Cancelar</Button>
              <Button type="submit">Cadastrar</Button>
            </Form>
          </Formik>
        </Grid>
      </Dialog>
    </Grid>
  );
};

export default AddProductsModal;
