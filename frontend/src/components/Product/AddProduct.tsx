import React from "react";
import {
  Modal,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
} from "@mui/material";
import { FeedstockType } from "types/Feedstock.type";
import { options } from "components/Feedstock/FeedstockUnit";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  feedstocks: FeedstockType[];
  onAddItem: () => void;
  setSelectedFeedstock: React.Dispatch<
    React.SetStateAction<FeedstockType | null>
  >;
  setQuantityOfUse: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedUnitFabrication: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onClose,
  feedstocks,
  onAddItem,
  setSelectedFeedstock,
  setQuantityOfUse,
  setSelectedUnitFabrication,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
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
            onChange={(e) => {
              const feedstock = feedstocks.find(
                (f) => f.name === e.target.value
              );
              setSelectedFeedstock(feedstock || null);
            }}
          >
            {feedstocks.map((feedstock) => (
              <MenuItem key={feedstock.name} value={feedstock.name}>
                {feedstock.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Unidade de medida</InputLabel>
        </FormControl>
        <FormControl>
          <Select
            onChange={(e) =>
              setSelectedUnitFabrication(e.target.value as string)
            }
          >
            {options.map((optionValue) => (
              <MenuItem key={optionValue.value} value={optionValue.label}>
                {optionValue.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Quantidade de Uso"
          type="number"
          onChange={(e) => setQuantityOfUse(Number(e.target.value))}
        />
        <Button onClick={onAddItem}>Adicionar</Button>
      </Box>
    </Modal>
  );
};

export default ProductModal;
