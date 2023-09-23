import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Modal,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { options } from "components/Feedstock/FeedstockUnit";
import { FeedstockType } from "types/Feedstock.type";

interface ProductTableProps {
  feedstocks: FeedstockType[];
}

interface AddedFeedstockType extends FeedstockType {
  quantityOfUse: number;
  costUnit: number;
}

export function ProductTable({ feedstocks }: ProductTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedFeedstock, setSelectedFeedstock] =
    useState<FeedstockType | null>(null);
  const [quantityOfUse, setQuantityOfUse] = useState<number | null>(null);
  const [addedFeedstocks, setAddedFeedstocks] = useState<AddedFeedstockType[]>(
    []
  );

  const handleAddItem = () => {
    if (!selectedFeedstock || !quantityOfUse) return;

    const costUnit = quantityOfUse * selectedFeedstock.price;

    const newItem = {
      ...selectedFeedstock,
      quantityOfUse: quantityOfUse,
      costUnit: costUnit,
    };

    setAddedFeedstocks((prev) => [...prev, newItem]);
    setOpen(false);
  };

  const handleDeleteItem = (itemToDelete: AddedFeedstockType) => {
    setAddedFeedstocks((prev) =>
      prev.filter((feedstock) => feedstock !== itemToDelete)
    );
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Cadastrar</Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Insumo</TableCell>
            <TableCell>qtd/Uso</TableCell>
            <TableCell>Preço de aquisição</TableCell>
            <TableCell>Custo unitário</TableCell>
            <TableCell>Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {addedFeedstocks.map((feedstock, index) => (
            <TableRow key={index}>
              <TableCell>{feedstock.name}</TableCell>
              <TableCell>{feedstock.quantityOfUse}</TableCell>
              <TableCell>{feedstock.price}</TableCell>
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

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            margin: "auto",
            width: 300,
            padding: 2,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <FormControl>
            <InputLabel>Insumo</InputLabel>
            <Select
              value={selectedFeedstock?.name || ""}
              onChange={(e) => {
                const feedstock = feedstocks.find(
                  (f) => f.name === e.target.value
                );
                setSelectedFeedstock(feedstock || null);
              }}
            >
              {feedstocks.map((feedstock) => (
                <MenuItem key={feedstock.id} value={feedstock.name}>
                  {feedstock.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Quantidade de Uso"
            type="number"
            value={quantityOfUse || ""}
            onChange={(e) => setQuantityOfUse(Number(e.target.value))}
          />

          <Button onClick={handleAddItem}>Adicionar</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ProductTable;
