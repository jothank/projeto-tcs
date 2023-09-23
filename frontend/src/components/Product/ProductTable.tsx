import { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FeedstockType } from "types/Feedstock.type";
import { setProduct } from "services/product.service";
import { setProducts } from "services/registration.service";
import ProductModal from "components/Product/AddProduct";
import { AddedFeedstockType, ProductTableProps } from "types/Product.types";

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

    console.log(idProduct);
    console.log("preços", purchasedPrice);
    setProducts(name, idProduct, purchasedPrice);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Cadastrar</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Insumo</TableCell>
            <TableCell>Unidade de medida fabricar</TableCell>
            <TableCell>qtd/Uso</TableCell>
            <TableCell>Preço de aquisição</TableCell>
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
              <TableCell>{feedstock.price}</TableCell>
              <TableCell>{feedstock.unit}</TableCell>
              <TableCell>{feedstock.costUnit}</TableCell>
              <TableCell>
                <Button onClick={() => handleDeleteItem(feedstock)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TextField
        label="Nome do Produto"
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={handleSaveRows}>Salvar Produto</Button>
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
