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
import * as XLSX from "xlsx";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const ProductTable = ({ data }: ProductTableProps) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => {
      setIsGeneratingPDF(true);
      return new Promise((resolve) => {
        setTimeout(resolve, 1);
      });
    },
    onAfterPrint: () => setIsGeneratingPDF(false),
  });

  const [isAddModalOpen, setisAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    data?.results.length ? data.results[0].id : null
  );

  const [selectedSupply, setSelectedSupply] = useState<any | null>(null);

  const selectedProduct = data.results.find(
    (product) => product.id === selectedProductId
  );

  const handleDelete = (productId: number) => {
    Swal.fire({
      title: "Tem certeza de que deseja excluir este produto?",
      text: "Esta ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteSupply(productId);
          console.log(`Produto com ID ${productId} foi excluído com sucesso.`);
          Swal.fire("Excluído!", "O produto foi excluído.", "success").then(
            () => {
              location.reload();
            }
          );
        } catch (error) {
          getErro(`Erro ao excluir o produto com ID ${productId}`);
          console.error(
            `Erro ao excluir o produto com ID ${productId}:`,
            error
          );
        }
      } else {
        Swal.fire("Cancelado", "O produto não foi excluído.", "error");
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

  const handleExportToXLS = () => {
    if (selectedProduct) {
      const ws = XLSX.utils.json_to_sheet(
        selectedProduct.supplies.map((supply) => ({
          Insumo: supply.feedstock.name,
          "Unidade de Fabricação": supply.unit,
          "Quantidade de uso": supply.quantity,
          "Unidade de aquisição": supply.feedstock.unit,
          "Valor de aquisição": formatToBRL(supply.feedstock.price),
          "Valor unitário": formatToBRL(supply.price),
        }))
      );

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Supplies");

      XLSX.writeFile(wb, "product_data.xlsx");
    }
  };

  return (
    <Paper
      sx={{
        width: "80%",
        marginLeft: "10%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // justifyContent: "space-between",
          padding: 20,
        }}
      >
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
            sx={{ mr: 2 }}
          >
            {data.results.map((productItem) => (
              <MenuItem key={productItem.id} value={productItem.id}>
                {productItem.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid>
          <Button onClick={handlePrint} variant="outlined" sx={{ mr: 2 }}>
            <PrintIcon />
          </Button>
          <Button onClick={handleExportToXLS} variant="outlined">
            <CloudDownloadIcon />
          </Button>
        </Grid>
      </div>
      <div ref={componentRef}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "30px",
            padding: "20px",
          }}
        >
          <Typography variant="h6" component="div">
            {selectedProduct
              ? selectedProduct.name
              : "Nenhum produto selecionado"}
          </Typography>
        </div>
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
                <TableCell align="center"></TableCell>
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
                      {!isGeneratingPDF && (
                        <>
                          <Button
                            onClick={() => handleDelete(product.id)}
                            color="error"
                          >
                            <DeleteIcon
                              style={{
                                cursor: "pointer",
                                color: "red",
                              }}
                            />
                          </Button>
                          <Button
                            onClick={() => {
                              setIsEditModalOpen(true);
                              setSelectedSupply(product);
                            }}
                          >
                            <EditIcon
                              style={{
                                cursor: "pointer",
                                color: "blue",
                              }}
                            />
                          </Button>
                        </>
                      )}
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
      </div>

      {selectedProduct && (
        <>
          <Typography variant="subtitle1" align="right" style={{ padding: 16 }}>
            Preço Total: {formatToBRL(selectedProduct.price)}
          </Typography>
          <Grid>
            <Button
              variant="contained"
              onClick={() => {
                setIsAddProductOpen(true);
              }}
              sx={{ margin: "20px" }}
            >
              Adicionar Itens
            </Button>
          </Grid>
        </>
      )}
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
      {isGeneratingPDF && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isGeneratingPDF}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Paper>
  );
};

export default ProductTable;
