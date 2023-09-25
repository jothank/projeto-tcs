import React, { useState } from "react";
import {
  Modal,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { FeedstockType } from "types/Feedstock.type";
import { options } from "components/Feedstock/FeedstockUnit";
import { ButtonContainer } from "components/ButtonContainer/ButtonContainer";

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
  const [selectedUnit, setSelectedUnit] = useState<string | "">("");
  const [selectedFeedstockName, setSelectedFeedstockName] = useState<
    string | ""
  >("");

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          margin: "auto",
          width: 300,
          padding: 2,
          backgroundColor: "white",
          marginTop: "10%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography>Adicionar Produto</Typography>
        <Divider />
        <FormControl>
          <InputLabel>Insumo</InputLabel>
          <Select
            value={selectedFeedstockName}
            onChange={(e) => {
              const feedstock = feedstocks.find(
                (f) => f.name === e.target.value
              );
              setSelectedFeedstock(feedstock || null);
              setSelectedFeedstockName(e.target.value);
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
          <Select
            value={selectedUnit}
            onChange={(e) => {
              setSelectedUnitFabrication(e.target.value as string);
              setSelectedUnit(e.target.value as string);
            }}
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
        <ButtonContainer>
          <Button onClick={onClose} variant="outlined">
            Fechar
          </Button>
          <Button onClick={onAddItem} variant="contained">
            Adicionar
          </Button>
        </ButtonContainer>
      </Box>
    </Modal>
  );
};

export default ProductModal;
