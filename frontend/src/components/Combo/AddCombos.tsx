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
  comboName: Yup.string().min(3, `O Produto deve ter no minimo 3 caracteres`)
    .trim()
    .required("Este campo é obrigatório"),
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
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      getErro("Erro ao cadastrar combo");
      setOpen(false);
    }
  };

  return (
    <Grid>
      <Button variant="contained" onClick={handleOpen} sx={{ mr: 2 }}>
        Adicionar Combo
      </Button>

      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Adicionar Combo</DialogTitle>
        <Grid sx={{ padding: 2 }}>
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
                    <div>
                      {form.values.products.map(
                        (productId: number, index: number) => (
                          <div key={index}>
                            <FormControl fullWidth>
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
                              <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}>
                                <IconButton onClick={() => remove(index)}>
                                  <RemoveIcon sx={{ color: "red" }} />
                                </IconButton>
                              </div>

                            </FormControl>
                          </div>
                        )
                      )}
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <IconButton onClick={() => push(null)}>
                          <AddIcon sx={{
                            color: "green",
                          }} />
                        </IconButton>
                      </div>
                    </div>
                  )}
                </FieldArray>
              </Grid>
              <Button onClick={() => setOpen(false)}>Cancelar</Button>
              <Button variant="contained" type="submit">
                Cadastrar
              </Button>
            </Form>
          </Formik>
        </Grid>
      </Dialog>
    </Grid>
  );
};

export default AddProductsModal;
