import React, { useState } from "react";
import {
  Modal,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { options } from "components/Feedstock/FeedstockUnit";
import { RegistrationType } from "./RegistrationTable";
import { ButtonContainer } from "components/ButtonContainer/ButtonContainer";

interface RegistrationModalProps {
  open: boolean;
  onClose: () => void;
  registrations: RegistrationType[];
  onAddItem: () => void;
  setSelectedRegistration: React.Dispatch<
    React.SetStateAction<RegistrationType | null>
  >;
  selectedRegistration: RegistrationType | null;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
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
          marginTop: '10%',
          gap: 2,
        }}
      >
        <Box>
          <Typography>
            Produtos
          </Typography>
        </Box>
        <Divider />
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
        <ButtonContainer>
          <Button onClick={onClose} variant="outlined">Fechar</Button>
          <Button onClick={onAddItem} variant="contained">Adicionar</Button>
        </ButtonContainer>
      </Box>
    </Modal>
  );
};

export default RegistrationModal;
