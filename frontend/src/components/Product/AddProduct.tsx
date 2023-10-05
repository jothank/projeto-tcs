import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, Button, Grid } from "@mui/material";
import { calculatePricePerKiloOrLiter } from "utils/calculations/pricing";
import { getAllfeedstocks } from "services/feedstock.service";
import { setSupplies, Supply } from "services/product.service";
import { ProductType } from "types/Product.types";
import { setProduct } from "services/productRegistration.service";
import ProductForm from "./ProductForm";

export interface Feedstock {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen }) => {
  const [feedstockList, setFeedstockList] = useState<Feedstock[]>([]);
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

  useEffect(() => {
    const fetchFeedstocks = async () => {
      try {
        const result = await getAllfeedstocks();
        setFeedstockList(result);
      } catch (error) {
        console.error("Failed to fetch feedstocks:", error);
      }
    };
    if (open) {
      fetchFeedstocks();
    }
  }, [open]);

  const handleSubmit = async (values: any) => {
    try {
      let totalPrice = 0;

      console.log("1",values);

      const supplies = values.products.map((product: any) => {
        const calculatedPrice = calculatePricePerKiloOrLiter(
          product.feedstock.price,
          product.feedstock.quantity,
          product.feedstock.unit,
          product.quantity,
          product.unit
        );
        totalPrice += calculatedPrice;
        return {
          feedstock: product.feedstock.id,
          quantity: product.quantity,
          unit: product.unit,
          price: calculatedPrice,
        };
      });
      const regiProds = await setSupplies({ supplies });
      console.log("2",values);

      const idssupplies = regiProds.map((supply: ProductType) => supply.id);

      setProduct({
        name: values.productRegistrationName,
        supplies: idssupplies,
        price: totalPrice,
      });
      setOpen(false);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => handleOpen("product")}>
        Add Product
      </Button>
      <Button variant="outlined" onClick={() => handleOpen("revenda")}>
        Add Revenda
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
    </div>
  );
};

export default AddProductModal;
