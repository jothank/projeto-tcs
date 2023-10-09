import React, { useState } from "react";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RegistrationModal from "components/Registration/AddRegistration";
import { setCombo } from "services/combo.service";
import { ButtonContainer } from "components/ButtonContainer/ButtonContainer";

export interface RegistrationType {
  producion_price: number;
  products: any;
  id: number;
  name: string;
  unitFabrication?: string;
  quantityOfUse?: number;
  costUnit?: number; // Placeholder, but if you have logic, implement it
}

interface RegistrationTableProps {
  registrations: RegistrationType[];
}

export function RegistrationTable({ registrations }: RegistrationTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] =
    useState<RegistrationType | null>(null);
  const [addedRegistrations, setAddedRegistrations] = useState<
    RegistrationType[]
  >([]);
  const [comboName, setComboName] = useState<string>("");

  const handleAddItem = () => {
    if (!selectedRegistration) return;
    setAddedRegistrations((prev) => [...prev, selectedRegistration]);
    setOpen(false);
  };

  const handleDeleteItem = (itemToDelete: RegistrationType) => {
    setAddedRegistrations((prev) =>
      prev.filter((item) => item.id !== itemToDelete.id)
    );
  };

  const handleSaveRows = async () => {
    const registrationIDs = addedRegistrations.map(
      (registration) => registration.id
    );
    const totalProducionPrice = addedRegistrations.reduce(
      (acc, registration) => acc + registration.producion_price,
      0
    );

    try {
      await setCombo(registrationIDs, comboName, totalProducionPrice);
      console.log("Combo saved successfully.");
    } catch (error) {
      console.error("There was an error saving the combo:", error);
    }
  };

  return (
    <div>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="Nome do Combo"
          value={comboName}
          onChange={(e) => setComboName(e.target.value)}
        />
        <Grid display="flex">
          <ButtonContainer>
            <Button onClick={() => setOpen(true)} variant="contained">
              Cadastrar
            </Button>
            <Button onClick={handleSaveRows} variant="contained">
              Salvar
            </Button>
          </ButtonContainer>
        </Grid>
      </Grid>
      <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Unidade de medida fabricar</TableCell>
            <TableCell>qtd/Uso</TableCell>
            <TableCell>Preço de aquisição</TableCell>
            <TableCell>Custo unitário</TableCell>
            <TableCell>Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {addedRegistrations.map((registration, index) => (
            <TableRow key={index}>
              <TableCell>{registration.name}</TableCell>
              <TableCell>{registration.unitFabrication || "N/A"}</TableCell>
              <TableCell>{registration.quantityOfUse || 0}</TableCell>
              <TableCell>
                {"R$" + registration.producion_price.toString()}
              </TableCell>
              <TableCell>
                {"R$" + registration.producion_price.toString()}
              </TableCell>

              <TableCell>
                <Button onClick={() => handleDeleteItem(registration)}>
                  <DeleteIcon
                    sx={{
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
      </TableContainer>
      <RegistrationModal
        open={open}
        onClose={() => setOpen(false)}
        registrations={registrations}
        onAddItem={handleAddItem}
        setSelectedRegistration={setSelectedRegistration}
        selectedRegistration={selectedRegistration}
      />
    </div>
  );
}

export default RegistrationTable;
