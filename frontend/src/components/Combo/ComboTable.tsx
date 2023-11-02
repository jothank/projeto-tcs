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

const ComboTable = (props: any) => {
  const { data } = props;

  const [selectedComboId, setSelectedComboId] = useState<number | null>(
    data?.length ? data[0].id : null
  );
  const selectedCombo = data.find((combo: any) => combo.id === selectedComboId);

  const [isAddsModalProductOpen, setIsAddsModalProductOpen] = useState(false);
  const [isAddModalProductOpen, setIsAddModalProductOpen] = useState(false);
  const [products, setProducts] = useState<any>([]);

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
  });

  const exportToCSV = () => {
    const header = "Nome do produto,Unidade de Fabricação,Valor de aquisição";
    const csvData = selectedCombo?.products
      .map((product: any) => {
        return `${product.name},Un,${product.price}`;
      })
      .join("\n");

    const BOM = "\uFEFF";
    const csvContent = BOM + `${header}\n${csvData}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "combo_data.csv";
    a.click();
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
        <Grid
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "end",
          }}
        >
          <Button onClick={handlePrint} variant="outlined" style={{ marginRight: 10 }}>
            <PrintIcon />
          </Button>
          <Button onClick={exportToCSV} variant="outlined">
            <CloudDownloadIcon />
          </Button>
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

      <div ref={componentRef}>
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
    </Paper>
  );
};

export default ComboTable;