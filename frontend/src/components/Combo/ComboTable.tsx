import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Grid,
} from "@mui/material";

import { formatToBRL } from "utils/pricing";
import AddProductsModal from "./AddCombos";
import AddProductModal from "./AddCombo";
import { getAllProduct } from "services/product.service";

const ComboTable = (props: any) => {
  const { data } = props;

  const [selectedComboId, setSelectedComboId] = useState<number | null>(
    data?.length ? data[0].id : null
  );
  const selectedCombo = data.find((combo: any) => combo.id === selectedComboId);

  const [isAddsModalProductOpen, setIsAddsModalProductOpen] = useState(false);
  const [isAddModalProductOpen, setIsAddModalProductOpen] = useState(false);

  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const fetchFeedstocks = async () => {
      try {
        const result = await getAllProduct();
        setProducts(result);
      } catch (error) {
        console.error("Failed to fetch feedstocks:", error);
      }
    };
    fetchFeedstocks();
  }, []);

  return (
    <Paper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 16,
        }}
      >
        <Grid>
          <Typography variant="h6" component="div">
            {selectedCombo ? selectedCombo.name : "Nenhum Combo selecionado"}
          </Typography>
          <AddProductsModal
            isOpen={isAddsModalProductOpen}
            onClose={() => setIsAddsModalProductOpen(false)}
            productsList={products}
          />
        </Grid>
        <FormControl sx={{ width: "40%" }}>
          <InputLabel>Selecione o produto</InputLabel>
          <Select
            value={selectedComboId || ""}
            onChange={(event) =>
              setSelectedComboId(event.target.value as number)
            }
          >
            {data.map((productItem: any) => (
              <MenuItem key={productItem.id} value={productItem.id}>
                {productItem.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">Nome do produto</TableCell>
              <TableCell align="right">Unidade de Fabricação</TableCell>
              <TableCell align="right">Valor de aquisição</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedCombo ? (
              selectedCombo.products.map((product: any, index: number) => (
                <TableRow
                  key={product.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                  }}
                >
                  <TableCell align="right">{product.name}</TableCell>
                  <TableCell align="right">{"Un"}</TableCell>
                  <TableCell align="right">
                    {formatToBRL(product.price)}
                  </TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Nenhum Combo selecionado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedCombo && (
        <>
          <Typography variant="subtitle1" align="right" style={{ padding: 16 }}>
            Preço Total: {formatToBRL(selectedCombo.price)}
          </Typography>
          <AddProductModal
            isOpen={isAddModalProductOpen}
            onClose={() => setIsAddModalProductOpen(false)}
            productsList={products}
            selectedCombo={selectedCombo}
          />
        </>
      )}
    </Paper>
  );
};

export default ComboTable;
