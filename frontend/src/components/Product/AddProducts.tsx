import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, Button, Grid } from "@mui/material";
import { getAllfeedstocks } from "services/feedstock.service";
import { setSupplies, Supply } from "services/supply.service";
import { ProductType } from "types/Product.types";
import { setProduct } from "services/product.service";
import ProductForm from "./ProductForm";
import { FeedstockType } from "types/Feedstock.type";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedstockList: FeedstockType[];
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  feedstockList,
}) => {
  const [open, setOpen] = useState(isOpen);
  const [modalType, setModalType] = useState("");

  const handleOpen = (type: string) => {
    setModalType(type);
    setOpen(true);
  };

  const getTitle = () => {
    if (modalType === "product") {
      return "Cadastrar produto";
    } else if (modalType === "revenda") {
      return "Cadastrar item de revenda";
    } else {
      return "";
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      console.log("1", values);
      const supplies = values.products.map((product: any) => {
        return {
          feedstock: product.feedstock.id,
          quantity: product.quantity,
          unit: product.unit,
        };
      });
      const regiProds = await setSupplies({ supplies });
      console.log("2", values);

      const idssupplies = regiProds.map((supply: ProductType) => supply.id);

      setProduct({
        name: values.productRegistrationName,
        supplies: idssupplies,
      });
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <Grid>
      <Button
        variant="contained"
        onClick={() => handleOpen("product")}
        sx={{ mr: 2 }}
      >
        Adicionar Produto
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{getTitle()}</DialogTitle>
        <Grid>
          <ProductForm
            feedstockList={feedstockList}
            onSubmit={handleSubmit}
            onCancel={() => setOpen(false)}
          />
        </Grid>
      </Dialog>
    </Grid>
  );
};

export default AddProductModal;
