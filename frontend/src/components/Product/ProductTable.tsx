import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FeedstockType } from "types/Feedstock.type";
import ProductModal from "components/Product/AddProduct";
import { AddedFeedstockType, ProductTableProps } from "types/Product.types";
import { ButtonContainer } from "components/ButtonContainer/ButtonContainer";
import { setProduct } from "services/product.service";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import { setProducts } from "services/registration.service";

export function ProductTable({ feedstocks }: ProductTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedFeedstock, setSelectedFeedstock] =
    useState<FeedstockType | null>(null);
  const [quantityOfUse, setQuantityOfUse] = useState<number | null>(null);
  const [selectedUnitFabrication, setSelectedUnitFabrication] = useState<
    string | null
  >(null);
  const [addedFeedstocks, setAddedFeedstocks] = useState<AddedFeedstockType[]>(
    []
  );
  const [name, setName] = useState<string>("");
  const componentRef = React.useRef(null);
  const handleAddItem = () => {
    if (
      !selectedFeedstock ||
      !quantityOfUse ||
      !selectedUnitFabrication ||
      !selectedFeedstock.id
    )
      return;

    let newQuantityOfUse = quantityOfUse;
    if (selectedUnitFabrication === "g" || selectedUnitFabrication === "ml") {
      newQuantityOfUse = newQuantityOfUse / 1000;
    }

    const factor = 100;
    const costUnit =
      Math.floor(newQuantityOfUse * selectedFeedstock.price * factor) / factor;

    const newItem: AddedFeedstockType = {
      id: selectedFeedstock.id,
      quantityOfUse: newQuantityOfUse,
      costUnit,
      unitFabrication: selectedUnitFabrication,
      name: selectedFeedstock.name,
      price: selectedFeedstock.price,
      quantity: 0,
      unit: selectedFeedstock.unit,
    };

    setAddedFeedstocks((prev) => [...prev, newItem]);
    setOpen(false);
  };

  const handleDeleteItem = (itemToDelete: AddedFeedstockType) => {
    setAddedFeedstocks((prev) =>
      prev.filter((feedstock) => feedstock !== itemToDelete)
    );
  };

  const handleSaveRows = async () => {
    let idProduct: any[] = [];
    var purchasedPrice = 0;

    for (const product of addedFeedstocks) {
      if (product.id !== undefined) {
        const productId = await setProduct(
          product.id,
          product.costUnit,
          product.quantityOfUse,
          product.unitFabrication
        );
        idProduct.push(productId.id);
        purchasedPrice += Number(productId.price);
      }
    }
    setProducts(name, idProduct, purchasedPrice);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div ref={componentRef}>
      <Grid
        sx={{
          display: "flex",
          alignItems: "end",
          justifyContent: "end",
        }}
      >
        <ButtonContainer>
          <Button onClick={() => setOpen(true)} variant="contained">
            Cadastrar
          </Button>
          <Button onClick={handlePrint} variant="outlined">
            <PrintIcon />
          </Button>
        </ButtonContainer>
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Insumo</TableCell>
            <TableCell>
              <Typography variant="subtitle2">
                Unidade de medida Fábrica
              </Typography>
            </TableCell>
            <TableCell>Quantidade / Uso</TableCell>
            <TableCell>Preço de Compra</TableCell>
            <TableCell>Unidade de medida</TableCell>
            <TableCell>Custo unitário</TableCell>
            <TableCell>Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {addedFeedstocks.map((feedstock, index) => (
            <TableRow key={index}>
              <TableCell>{feedstock.name}</TableCell>
              <TableCell>{feedstock.unitFabrication}</TableCell>
              <TableCell>{feedstock.quantityOfUse}</TableCell>
              <TableCell>R${feedstock.price}</TableCell>
              <TableCell>{feedstock.unit}</TableCell>
              <TableCell>R${feedstock.costUnit}</TableCell>
              <TableCell>
                <Button onClick={() => handleDeleteItem(feedstock)}>
                  <DeleteIcon
                    style={{
                      cursor: "pointer",
                      marginRight: "10px",
                      color: "red",
                    }}
                  />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid
        sx={{
          marginTop: "2%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="Nome do Produto"
          type="text"
          onChange={(e) => setName(e.target.value)}
          sx={{ width: "50%" }}
        />
        <Button
          onClick={handleSaveRows}
          variant="contained"
          sx={{ height: "50%", marginTop: "1%" }}
        >
          Salvar{" "}
        </Button>
      </Grid>
      <ProductModal
        open={open}
        onClose={() => setOpen(false)}
        feedstocks={feedstocks}
        onAddItem={handleAddItem}
        setSelectedFeedstock={setSelectedFeedstock}
        setQuantityOfUse={setQuantityOfUse}
        setSelectedUnitFabrication={setSelectedUnitFabrication}
      />
    </div>
  );
}

export default ProductTable;
