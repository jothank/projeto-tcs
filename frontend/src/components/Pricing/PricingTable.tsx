import React, { useState, useEffect } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TableContainer,
  Select,
  MenuItem,
} from "@mui/material";
import { getAllProduct } from "services/product.service";
import { getCombos } from "services/combo.service";

const PricingTable = () => {
  const [itemType, setItemType] = useState("");
  const [selectedItems, setSelectedItems] = useState<any[]>([]); 
  const [isProductSelected, setIsProductSelected] = useState(true);

  const [availableItems, setAvailableItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProduct();
        const combos = await getCombos();
        setAvailableItems([...combos, ...products]);
      } catch (error) {
      }
    };

    fetchProducts();
  }, []);

  const addItem = () => {
    if (!itemType) {
      alert("Por favor, selecione um tipo de item.");
      return;
    }

    const selectedItem = availableItems.find((item) => item.id === itemType);
    if (selectedItem) {
      setSelectedItems([...selectedItems, selectedItem]);
      setItemType(""); 
    }
  };

  const renderTable = () => {
    if (isProductSelected) {
      return (
        <Paper >
        <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Insumo</TableCell>
              <TableCell align="right">Unidade de Fabricação</TableCell>
              <TableCell align="right">Quantidade de uso</TableCell>
              <TableCell align="right">Unidade de aquisição</TableCell>
              <TableCell align="right">Valor de aquisição</TableCell>
              <TableCell align="right">Valor unitário</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.unity}</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Aquisição Unit</TableCell>
                <TableCell>Valor Aquisição</TableCell>
                <TableCell>Valor Unitário</TableCell>
                <TableCell>
                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
        </Paper>
      );
    } else {
    
    }
  };

  return (
    <Paper
    sx={{
      width: "70%",
      marginLeft: "10%"
    }}
    >
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h6" color="textSecondary">Tipo de Item</Typography>
      </Grid>
      <Grid item xs={6}>
        <Select
          value={itemType}
          onChange={(e) => setItemType(e.target.value)}
          fullWidth
          variant="outlined"
        >
          <MenuItem value="">Selecione um item</MenuItem>
          {availableItems.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name} - {item.type}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={addItem} variant="outlined">
          Adicionar à tabela
        </Button>
        <Button onClick={() => setIsProductSelected(true)}>Exibir Produtos</Button>
        <Button onClick={() => setIsProductSelected(false)}>Exibir Combos</Button>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          {renderTable()}
        </TableContainer>
      </Grid>
    </Grid>
    </Paper>
  );
};

export default PricingTable;
