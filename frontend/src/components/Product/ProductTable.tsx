import React, { useState, useRef, useEffect } from "react";
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
  Grid,
  TableContainer,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import AddProductModal from "components/Product/AddProducts";
import { formatToBRL } from "utils/pricing";
import { deleteSupply } from "services/supply.service";
import { ProductTableProps } from "types/Product.types";
import EditDialog from "./EditProduct";
import { getAllfeedstocks } from "services/feedstock.service";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { FeedstockType } from "types/Feedstock.type";
import AddProduct from "./AddProduct";

const ProductTable = ({ data }: ProductTableProps) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [isAddModalOpen, setisAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    data?.results.length ? data.results[0].id : null
  );

  const [selectedSupply, setSelectedSupply] = useState<any | null>(null);

  const selectedProduct = data.results.find(
    (product) => product.id === selectedProductId
  );

  const handleDelete = async (productId: number) => {
    try {
      console.log(productId);
      await deleteSupply(productId);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const [feedstockList, setFeedstockList] = useState<FeedstockType[]>([]);

  useEffect(() => {
    const fetchFeedstocks = async () => {
      try {
        const result = await getAllfeedstocks();
        setFeedstockList(result);
      } catch (error) {
        console.error("Failed to fetch feedstocks:", error);
      }
    };
    fetchFeedstocks();
  }, []);

  const handleExportToCSV = () => {
    if (selectedProduct) {
      const csvContent =
        "Insumo,Unidade de Fabricacao,Quantidade de uso,Unidade de aquisicao,Valor de aquisicao,Valor unitario\n" +
        selectedProduct.supplies
          .map((product) => {
            const row = [
              product.feedstock.name,
              product.unit,
              product.quantity,
              product.feedstock.unit,
              formatToBRL(product.feedstock.price),
              formatToBRL(product.price),
            ];
            return row.join(",");
          })
          .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const link = document.createElement("a");

      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "product_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
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
        <Grid>
          <Button onClick={handlePrint} variant="outlined" sx={{ mr: 2 }}>
            <PrintIcon />
          </Button>
          <Button onClick={handleExportToCSV} variant="outlined">
            <CloudDownloadIcon />
          </Button>
        </Grid>
        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={() => setisAddModalOpen(false)}
          feedstockList={feedstockList}
        />
        <FormControl sx={{ width: "40%" }}>
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
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedProduct ? (
                selectedProduct.supplies.map((product, index) => (
                  <TableRow
                    key={`${product.id}-${index}`}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {product.feedstock.name}
                    </TableCell>
                    <TableCell align="right">{product.unit}</TableCell>
                    <TableCell align="right">{product.quantity}</TableCell>
                    <TableCell align="right">
                      {product.feedstock.unit}
                    </TableCell>
                    <TableCell align="right">
                      {formatToBRL(product.feedstock.price)}
                    </TableCell>
                    <TableCell align="right">
                      {formatToBRL(product.price)}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => handleDelete(product.id)}
                        color="error"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => {
                          setIsEditModalOpen(true);
                          setSelectedSupply(product);
                        }}
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
        </TableContainer>
        {selectedProduct && (
          <>
            <Typography
              variant="subtitle1"
              align="right"
              style={{ padding: 16 }}
            >
              Preço Total: {formatToBRL(selectedProduct.price)}
            </Typography>
            <Button
              onClick={() => {
                setIsAddProductOpen(true);
              }}
            >
              Adicionar Itens
            </Button>
          </>
        )}
      </div>
      <EditDialog
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        selectedSupply={selectedSupply}
        feedstockList={feedstockList}
      />
      <AddProduct
        selectProduct={selectedProduct}
        feedstockList={feedstockList}
        onClose={() => setIsAddProductOpen(false)}
        open={isAddProductOpen}
      />
    </Paper>
  );
};

export default ProductTable;
