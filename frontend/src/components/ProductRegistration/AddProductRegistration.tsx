
import React, { useState } from "react";
import {
  Modal,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { options } from "components/Feedstock/FeedstockUnit";
import { ProductRegistrationType } from "types/ProductRegistration.types";


interface RegistrationModalProps {
  open: boolean;
  onClose: () => void;
  registrations: ProductRegistrationType[];
  onAddItem: () => void;
  setSelectedRegistration: React.Dispatch<
    React.SetStateAction<ProductRegistrationType | null>
  >;
  selectedRegistration: ProductRegistrationType | null;
}

const AddProductRegistration: React.FC<RegistrationModalProps> = ({
  open,
  onClose,
  registrations,
  onAddItem,
  setSelectedRegistration,
  selectedRegistration,
}) => {
  const [selectedUnit, setSelectedUnit] = useState<string>("");

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
          <InputLabel>Produtos</InputLabel>
          <Select
            value={selectedRegistration?.name || ""}
            onChange={(e) => {
              const registration = registrations.find(
                (f) => f.name === e.target.value
              );
              setSelectedRegistration(registration || null);
            }}
          >
            {registrations.map((registration) => (
              <MenuItem key={registration.name} value={registration.name}>
                {registration.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Unidade de medida</InputLabel>
          <Select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
          >
            {options.map((optionValue) => (
              <MenuItem key={optionValue.value} value={optionValue.label}>
                {optionValue.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button onClick={onAddItem}>Adicionar</Button>
      </Box>
    </Modal>
  );
};

export default AddProductRegistration;
