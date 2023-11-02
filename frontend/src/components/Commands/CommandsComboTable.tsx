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

import { getAllProduct } from "services/product.service";

const CommandsComboTable = (props: any) => {
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
        console.log(result)
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

  return (
    <Paper sx={{
        width: "600px",
        height: "600px",
        marginLeft: "30%"
        
        }}>
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
    <Grid sx={{
        width: "100%"
    }}>
      <div ref={componentRef}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">Nome do produto</TableCell>
                <TableCell align="right">Quantidade</TableCell>
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
                    <TableCell align="right">{product.Quantity}</TableCell>
                   
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
      </Grid>
    </Paper>
  );
};

export default CommandsComboTable;
