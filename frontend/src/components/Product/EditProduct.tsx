import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FeedstockSelect } from "components/SelectOptions/SelectOptions";
import { options } from "utils/FeedstockUnit";
import EditIcon from "@mui/icons-material/Edit";
import { getAllfeedstocks } from "services/feedstock.service";
import { Feedstock } from "types/Product.types";
import {
  GetFeedstocksSelect,
  ProductInput,
} from "components/Product/InputProduct";

export interface Product {
  feedstock: {
    id?: number;
    name: string;
    price: number;
    unit: string;
  };
  id: number;
  price: number;
  quantity: number;
  unit: string;
}

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  initialValues: Product;
}

const EditDialog: React.FC<EditDialogProps> = ({
  open,
  onClose,
  initialValues,
}) => {
  const [feedstockList, setFeedstockList] = useState<Feedstock[]>([]);

  useEffect(() => {
    const fetchFeedstocks = async () => {
      try {
        console.log(initialValues);
        const result = await getAllfeedstocks();
        setFeedstockList(result);
        console.log("Feedstocks:", result);
      } catch (error) {
        console.error("Failed to fetch feedstocks:", error);
      }
    };
    if (open) {
      fetchFeedstocks();
    }
  }, [open]);

  const validationSchema = Yup.object({
    unit: Yup.string().required("Unidade é obrigatório"),
    feedstock: Yup.object().shape({
      id: Yup.number().required("Matéria-prima é obrigatório"),
    }),
  });

  const handleEdit = async (values: Product) => {
    try {
      console.log(values);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Editar Item</DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleEdit}
        >
          {({ isSubmitting }) => (
            <Form>
              <DialogContent>
                <ProductInput
                  name="quantity"
                  label="Quantidade"
                  type="number"
                />
                <GetFeedstocksSelect
                  name="feedstock"
                  label="Matéria-prima"
                  feedstocks={feedstockList}
                />

                <FeedstockSelect
                  name="unit"
                  label="Unidade"
                  options={options}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose} color="primary">
                  Cancelar
                </Button>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  Salvar
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default EditDialog;
