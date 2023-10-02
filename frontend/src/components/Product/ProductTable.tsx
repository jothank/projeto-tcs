import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import AddProductModal from "components/Product/AddProduct";
import { formatToBRL } from "utils/calculations/pricing";

export interface ProductTableProps {
  data: {
    results: {
      id: number;
      name: string;
      producion_price: number;
      products: {
        id: number;
        feedstock: {
          name: string;
          price: number;
          unit: string;
        };
        quantity: number;
        unit: string;
        price: number;
      }[];
    }[];
  };
}

const ProductTable = ({ data }: ProductTableProps) => {
  if (!data || !data.results || data.results.length === 0) {
    return <Typography>No data available</Typography>;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState<number>(
    data.results[0].id
  );
  const product = data.results.find(
    (product) => product.id === selectedProductId
  );

  if (!product) {
    return <Typography>Error: Product not found</Typography>;
  }

  return (
    <Paper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 16,
        }}
      >
        <Typography variant="h6" component="div">
          {product.name}
        </Typography>
        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <Select
          value={selectedProductId}
          onChange={(event) =>
            setSelectedProductId(event.target.value as number)
          }
        >
          {data.results.map((productItem) => (
            <MenuItem key={productItem.id} value={productItem.id}>
              {productItem.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Insumo</TableCell>
            <TableCell align="right">Unidade de Fabricação</TableCell>
            <TableCell align="right">Quantidade de uso</TableCell>
            <TableCell align="right">Unidade de aquisição</TableCell>

            <TableCell align="right">Valor de aquisição</TableCell>
            <TableCell align="right">Valor unitario</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.products.map((productItem, index) => (
            <TableRow key={`${productItem.id}-${index}`}>
              <TableCell component="th" scope="row">
                {productItem.feedstock.name}
              </TableCell>
              <TableCell align="right">{productItem.unit}</TableCell>
              <TableCell align="right">{productItem.quantity}</TableCell>
              <TableCell align="right">{productItem.feedstock.unit}</TableCell>
              <TableCell align="right">
                {formatToBRL(productItem.feedstock.price)}
              </TableCell>
              <TableCell align="right">
                {formatToBRL(productItem.price)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography variant="subtitle1" align="right" style={{ padding: 16 }}>
        Total Price: {product.producion_price}
      </Typography>
    </Paper>
  );
};

export default ProductTable;
