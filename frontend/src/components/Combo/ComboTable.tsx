import React, { useEffect, useState, useRef } from "react";
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
  Button,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { formatToBRL } from "utils/pricing";
import AddProductsModal from "./AddCombos";
import AddProductModal from "./AddCombo";
import { getAllProduct } from "services/product.service";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCombo, updateCombo } from "services/combo.service";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const ComboTable = (props: any) => {
  const { data } = props;

  const [selectedComboId, setSelectedComboId] = useState<number | null>(
    data?.length ? data[0].id : null
  );
  let selectedCombo = data.find((combo: any) => combo.id === selectedComboId);

  const [isAddsModalProductOpen, setIsAddsModalProductOpen] = useState(false);
  const [isAddModalProductOpen, setIsAddModalProductOpen] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const componentRef = useRef(null);

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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => {
      setIsGeneratingPDF(true);
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1);
      });
    },
    onAfterPrint: () => {
      setIsGeneratingPDF(false);
    },
  });

  const exportToXLS = () => {
    if (selectedCombo) {
      const ws = XLSX.utils.json_to_sheet(
        selectedCombo.products.map((product: any) => ({
          "Nome do produto": product.name,
          "Unidade de Fabricação": "Un",
          "Valor de aquisição": `R$ ${product.price}`,
        }))
      );

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Produtos");

      XLSX.writeFile(wb, "combo_data.xlsx");
    }
  };

  const handleDelete = async (productIdToRemove: number) => {
    Swal.fire({
      title: "Tem certeza de que deseja excluir este item?",
      text: "Esta ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const index = selectedCombo.products.findIndex(
            (product: { id: number }) => product.id === productIdToRemove
          );

          if (index !== -1) {
            const newProducts = [
              ...selectedCombo.products.slice(0, index),
              ...selectedCombo.products.slice(index + 1),
            ];

            const updatedCombo = { ...selectedCombo, products: newProducts };
            selectedCombo = updatedCombo;

            const productIds = updatedCombo.products.map(
              (product: { id: any }) => product.id
            );

            await updateCombo(updatedCombo.id, productIds, updatedCombo.name);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }

          Swal.fire("Excluído!", "O item foi excluído.", "success");
        } catch (error) {
          console.error(error);
          Swal.fire("Erro!", "Ocorreu um erro ao excluir o item.", "error");
        }
      } else {
        Swal.fire("Cancelado", "O item não foi excluído.", "error");
      }
    });
  };

  const handleDeleteCombo = async (id: number) => {
    Swal.fire({
      title: "Tem certeza de que deseja excluir este item?",
      text: "Esta ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCombo(id);
          window.location.reload();
        } catch (error) {
          console.error(error);
          Swal.fire("Erro!", "Ocorreu um erro ao excluir o item.", "error");
        }
      } else {
        Swal.fire("Cancelado", "O item não foi excluído.", "error");
      }
    });
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
        <AddProductsModal
          isOpen={isAddsModalProductOpen}
          onClose={() => setIsAddsModalProductOpen(false)}
          productsList={products}
        />
        <FormControl sx={{ width: "40%" }}>
          <InputLabel>Selecione o produto</InputLabel>
          <Select
            value={selectedComboId || ""}
            onChange={(event) =>
              setSelectedComboId(event.target.value as number)
            }
            sx={{ mr: 2 }}
          >
            {data.map((productItem: any) => (
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
          <Button onClick={exportToXLS} variant="outlined">
            <CloudDownloadIcon />
          </Button>
          {selectedCombo && selectedCombo.id && (
            <Button
              onClick={() => handleDeleteCombo(selectedCombo.id)}
              color="error"
            >
              <DeleteIcon
                style={{ cursor: "pointer", marginRight: "10px", color: "red" }}
              />
            </Button>
          )}
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
          <Grid>
            <Typography variant="h6" component="div">
              {selectedCombo ? selectedCombo.name : "Nenhum Combo selecionado"}
            </Typography>
          </Grid>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Nome do produto</TableCell>
                <TableCell align="center">Unidade de Fabricação</TableCell>
                <TableCell align="center">Valor de aquisição</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedCombo ? (
                selectedCombo.products.map((product: any, index: number) => (
                  <TableRow
                    key={`${product.id}-${index}`}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                    }}
                  >
                    <TableCell align="center">{product.name}</TableCell>
                    <TableCell align="center">{"Un"}</TableCell>
                    <TableCell align="center">
                      {formatToBRL(product.price)}
                    </TableCell>
                    <TableCell align="center">
                      {!isGeneratingPDF && (
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
                      )}
                    </TableCell>
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
      </div>

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

export default ComboTable;
