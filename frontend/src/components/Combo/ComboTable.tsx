import React, { useState } from "react";
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

const ComboTable = (props: any) => {
  const { data } = props;

  const [selectedComboId, setSelectedComboId] = useState<number | null>(
    data?.length ? data[0].id : null
  );

  const selectedCombo = data.find((combo: any) => combo.id === selectedComboId);

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
                <TableRow key={product.id}>
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
    </Paper>
  );
};

export default ComboTable;
