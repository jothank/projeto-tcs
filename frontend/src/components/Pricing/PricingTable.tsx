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
  const [selectedItems, setSelectedItems] = useState<any[]>([]); // Estado para os itens selecionados.
  const [isProductSelected, setIsProductSelected] = useState(true); // Estado para rastrear se é um produto ou combo selecionado.

  const [availableItems, setAvailableItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProduct();
        const combos = await getCombos();
        setAvailableItems([...combos, ...products]);
      } catch (error) {
        // Trate erros adequados aqui.
      }
    };

    fetchProducts();
  }, []);

  const addItem = () => {
    if (!itemType) {
      alert("Por favor, selecione um tipo de item.");
      return;
    }

    // Adicione o item selecionado à lista de itens da tabela.
    const selectedItem = availableItems.find((item) => item.id === itemType);
    if (selectedItem) {
      setSelectedItems([...selectedItems, selectedItem]);
      setItemType(""); // Limpa a seleção após adicionar o item.
    }
  };

  const renderTable = () => {
    if (isProductSelected) {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Insumo</TableCell>
              <TableCell align="right">Unidade de Fabricação</TableCell>
              <TableCell align="right">Quantidade de uso</TableCell>
              <TableCell align="right">Unidade de aquisição</TableCell>
              <TableCell align="right">Valor de aquisição</TableCell>
              <TableCell align="right">Valor unitário</TableCell>
              <TableCell align="right">Ações</TableCell>
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
                  {/* Adicione botões de ações aqui */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    } else {
      // Tabela de Combos
      // Adicione o código da tabela de Combos aqui.
      // Use a mesma estrutura, mas com os detalhes específicos dos combos.
    }
  };

  return (
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
  );
};

export default PricingTable;
