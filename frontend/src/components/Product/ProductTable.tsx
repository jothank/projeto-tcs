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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
import Swal from "sweetalert2";
import { getErro } from "utils/ModalAlert";

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

  const handleDelete = (productId: number) => {
    Swal.fire({
      title: 'Tem certeza de que deseja excluir este produto?',
      text: "Esta ação não pode ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteSupply(productId);
          console.log(`Produto com ID ${productId} foi excluído com sucesso.`);
          Swal.fire(
            'Excluído!',
            'O produto foi excluído.',
            'success').then(() => { location.reload(); }
            );
        } catch (error) {
          getErro(`Erro ao excluir o produto com ID ${productId}`);
          console.error(`Erro ao excluir o produto com ID ${productId}:`, error);
        }
      } else {
        Swal.fire(
          'Cancelado',
          'O produto não foi excluído.',
          'error'
        );
      }
    });
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
      const header = "Insumo,Unidade de Fabricacao,Quantidade de uso,Unidade de aquisição,Valor de aquisicao,Valor unitario";

      const csvData = selectedProduct.supplies
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

      const BOM = "\uFEFF";
      const csvContent = BOM + `${header}\n${csvData}`;
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "product_data.csv";
      a.click();
    }
  };

  return (
    <Paper
      sx={{
        width: "80%",
        marginLeft: "10%"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 20,
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
                <TableCell align="center">Insumo</TableCell>
                <TableCell align="center">Unidade de Fabricação</TableCell>
                <TableCell align="center">Quantidade de uso</TableCell>
                <TableCell align="center">Unidade de aquisição</TableCell>
                <TableCell align="center">Valor de aquisição</TableCell>
                <TableCell align="center">Valor unitário</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedProduct ? (
                selectedProduct.supplies.map((product, index) => (
                  <TableRow
                    key={`${product.id}-${index}`}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff"
                    }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {product.feedstock.name}
                    </TableCell>
                    <TableCell align="center">{product.unit}</TableCell>
                    <TableCell align="center">{product.quantity}</TableCell>
                    <TableCell align="center">
                      {product.feedstock.unit}
                    </TableCell>
                    <TableCell align="center">
                      {formatToBRL(product.feedstock.price)}
                    </TableCell>
                    <TableCell align="center">
                      {formatToBRL(product.price)}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => handleDelete(product.id)}
                        color="error"
                      >
                        <DeleteIcon style={{
                          cursor: "pointer",
                          marginRight: "10px",
                          color: "red",
                        }} />
                      </Button>
                      <Button
                        onClick={() => {
                          setIsEditModalOpen(true);
                          setSelectedSupply(product);
                        }}
                      >
                        <EditIcon style={{
                          cursor: "pointer",
                          marginRight: "10px",
                          color: "bleu",
                        }} />
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
            <Grid>
            <Button variant="outlined"
              onClick={() => {
                setIsAddProductOpen(true);
              }} 
              sx={{ mr: 2 }}
            >
              Adicionar Itens
            </Button>
            </Grid>
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
