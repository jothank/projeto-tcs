import React, { useEffect, useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableContainer,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  deleteProductionSimulator,
  getProductionSimulator,
  saveProductionSimulator,
} from "services/ProductionSimulator.service";
import { formatToBRL } from "utils/pricing";
import { FixedExpenseType } from "components/FixedExpenses/FixedExpensesView";
import { getFixedExpense } from "services/fixedexpense.service";
import TableFixedExpense from "./TableFixedExpense";
import ProductionTable from "./TableProductionSimulator";
import ModalAddProductionSimulator from "./ModalAddProductionSimulator";
import { getPricing } from "services/pricing.service";
import ModalEditProductionSimulator from "./ModalEditProductionSimulator";
import Swal from "sweetalert2";
import { getErro } from "utils/ModalAlert";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";
import PrintIcon from "@mui/icons-material/Print";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

export interface PricingType {
  id?: number;
  tax: number;
  card_tax: number;
  other?: number;
  profit: number;
  suggested_price: number;
  delivery_price?: number;
  condominium: number;
  product?: any;
  combo?: any;
}

export interface ProductionSimulatorType {
  id?: number;
  pricing: PricingType;
  production_quantity: number;
  amortization: number;
}

const ProductionSimulatorTable = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [productionSimulator, setProductionSimulator] = useState<
    ProductionSimulatorType[]
  >([]);
  const [fixedExpenses, setFixedExpenses] = useState<FixedExpenseType[]>([]);
  const [selectedFixedExpense, setSelectedFixedExpense] =
    React.useState<FixedExpenseType | null>(null);
  const [pricings, setPricings] = React.useState<PricingType[]>([]);
  const [editingSimulator, setEditingSimulator] =
    useState<ProductionSimulatorType | null>(null);
  const componentRef = React.useRef(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleAddProductionSimulator = async (
    newProductionSimulator: ProductionSimulatorType
  ) => {
    try {
      const response = await saveProductionSimulator(newProductionSimulator);
      console.log(response);
      window.location.reload();
    } catch (error) {}
  };

  const handleDeleteProductionSimulator = async (
    productionSimulator: ProductionSimulatorType
  ) => {
    try {
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
          const response = await deleteProductionSimulator(
            productionSimulator.id
          );
          console.log(response);
          window.location.reload();
        } else {
          Swal.fire("Cancelado", "O item não foi excluído.", "error");
        }
      });
    } catch (error) {
      getErro("Erro ao deletar simulação");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getProductionSimulator();
        setProductionSimulator(data);
        const result = await getFixedExpense();
        setFixedExpenses(result.results);
        const response = await getPricing();
        setPricings(response.results);
      } catch (error) {
        console.log(error);
      }
    })();
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

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.json_to_sheet(
      productionSimulator.map((item) => ({
        "Nome do prato": item.pricing.product?.name || item.pricing.combo?.name,
        "Condominio Unitário": item.pricing.condominium,
        "Quantidade de Produção": item.production_quantity,
        Amortização: item.amortization,
        "Preço Sugerido": item.pricing.suggested_price,
        "Custo Unitário":
          item.pricing.combo?.price || item.pricing.product?.price,
      }))
    );
    XLSX.utils.book_append_sheet(wb, ws, "Dados");
    XLSX.writeFile(wb, "simulator_data.xlsx");
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid sx={{ padding: 2, marginTop: "2%" }}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Simular Produção
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Selecione a despesa</InputLabel>
            <Select
              value={selectedFixedExpense?.id || ""}
              onChange={(event) =>
                setSelectedFixedExpense(
                  fixedExpenses.find(
                    (fixedExpense) => fixedExpense.id === event.target.value
                  ) || null
                )
              }
            >
              {fixedExpenses.map((fixedExpense) => (
                <MenuItem key={fixedExpense.id} value={fixedExpense.id}>
                  {fixedExpense.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid sx={{ padding: 2, marginTop: "2%" }}>
          <Button onClick={handlePrint} variant="outlined" sx={{ mr: 2 }}>
            <PrintIcon />
          </Button>
          <Button onClick={exportToExcel} variant="outlined">
            <CloudDownloadIcon />
          </Button>
        </Grid>
      </Grid>
      <div ref={componentRef}>
        <Grid item xs={12}>
          {selectedFixedExpense && (
            <TableFixedExpense fixedExpense={selectedFixedExpense} />
          )}
        </Grid>
        <Grid item xs={12}>
          {productionSimulator && (
            <ProductionTable
              selectedFixedExpense={selectedFixedExpense}
              productionSimulator={productionSimulator}
            />
          )}
        </Grid>
        <Paper sx={{ width: "100%", marginTop: "2%" }}>
          <TableContainer>
            <Typography variant="h5" align="center">
              Simulador de Produção
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Nome do prato</TableCell>
                  <TableCell align="center">Condominio Unitário</TableCell>
                  <TableCell align="center">Quantidade de Produção</TableCell>
                  <TableCell align="center">Amortização</TableCell>
                  <TableCell align="center">Preço Sugerido</TableCell>
                  <TableCell align="center">Custo Unitário</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productionSimulator.map((simulator, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 !== 0 ? "#ffffff" : "#f2f2f2",
                    }}
                  >
                    <TableCell align="center">
                      {simulator.pricing.product?.name ||
                        simulator.pricing.combo?.name}
                    </TableCell>
                    <TableCell align="center">
                      {formatToBRL(simulator.pricing.condominium)}
                    </TableCell>
                    <TableCell align="center">
                      {simulator.production_quantity}
                    </TableCell>
                    <TableCell align="center">
                      {formatToBRL(simulator.amortization)}
                    </TableCell>
                    <TableCell align="center">
                      {formatToBRL(simulator.pricing.suggested_price)}
                    </TableCell>
                    <TableCell align="center">
                      {formatToBRL(simulator.pricing.combo?.price) ||
                        formatToBRL(simulator.pricing.product?.price)}
                    </TableCell>

                    <TableCell align="center">
                      {!isGeneratingPDF && (
                        <>
                          <Button
                            onClick={() => {
                              handleDeleteProductionSimulator(simulator);
                            }}
                            color="secondary"
                            startIcon={
                              <DeleteIcon
                                style={{ cursor: "pointer", color: "red" }}
                              />
                            }
                          ></Button>
                          <Button
                            onClick={() => {
                              setOpenEdit(true);
                              setEditingSimulator(simulator);
                            }}
                            startIcon={
                              <EditIcon
                                style={{ cursor: "pointer", color: "blue" }}
                              />
                            }
                          ></Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <ModalAddProductionSimulator
        open={open}
        onClose={() => setOpen(false)}
        pricings={pricings}
        onProductionSimulatorUpdate={handleAddProductionSimulator}
      />
      <ModalEditProductionSimulator
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
          setEditingSimulator(null);
        }}
        productionSimulator={editingSimulator}
        pricings={pricings}
      />
      {isGeneratingPDF && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isGeneratingPDF}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};

export default ProductionSimulatorTable;
