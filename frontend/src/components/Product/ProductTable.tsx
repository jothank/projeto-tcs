import React, { useState, useRef } from "react";
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
  Button,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import AddProductModal from "components/Product/AddProduct";
import { formatToBRL } from "utils/calculations/pricing";
import { deleteProduct } from "services/product.service";
import { getProductRegistration } from "services/productRegistration.service";
import EditDialog, { Product } from "./EditProduct";

export interface ProductTableProps {
  data: {
    results: {
      id: number;
      name: string;
      producion_price: number;
      products: {
        id: number;
        feedstock: {
          id?: number;
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
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    data?.results.length ? data.results[0].id : null
  );

  const selectedProduct = data.results.find(
    (product) => product.id === selectedProductId
  );

  const handleDelete = async (productId: number) => {
    try {
      console.log(productId);
      await getProductRegistration(productId);
      await deleteProduct(productId);
    } catch (err) {
      console.log(err);
    }
  };

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
          {selectedProduct
            ? selectedProduct.name
            : "Nenhum produto selecionado"}
        </Typography>
        <Button onClick={handlePrint} variant="outlined">
          <PrintIcon />
        </Button>
        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <FormControl sx={{ width: "70%" }}>
          <InputLabel>Selecione o produto</InputLabel>
          <Select
            value={selectedProductId || ""}
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
        </FormControl>
      </div>
      <div ref={componentRef}>
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
            {selectedProduct ? (
              selectedProduct.products.map((productItem, index) => (
                <TableRow key={`${productItem.id}-${index}`}>
                  <TableCell component="th" scope="row">
                    {productItem.feedstock.name}
                  </TableCell>
                  <TableCell align="right">{productItem.unit}</TableCell>
                  <TableCell align="right">{productItem.quantity}</TableCell>
                  <TableCell align="right">
                    {productItem.feedstock.unit}
                  </TableCell>
                  <TableCell align="right">
                    {formatToBRL(productItem.feedstock.price)}
                  </TableCell>
                  <TableCell align="right">
                    {formatToBRL(productItem.price)}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleDelete(productItem.id)}
                      color="error"
                    >
                      Remover
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingProduct(productItem);
                        setIsEditModalOpen(true);
                      }}
                      color="primary"
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Nenhum produto selecionado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {selectedProduct && (
          <Typography variant="subtitle1" align="right" style={{ padding: 16 }}>
            Total Price: {formatToBRL(selectedProduct.producion_price)}
          </Typography>
        )}
      </div>
      {editingProduct && (
        <EditDialog
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialValues={editingProduct}
        />
      )}
    </Paper>
  );
};

export default ProductTable;
