import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TableContainer,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Paper,
  Grid,
  Typography,
} from "@mui/material";
import { CostType } from "./AddCosts";
import {
  deleteCost,
  deleteFixedExpense,
  getFixedExpense,
  saveCost,
  saveCosts,
  updateCost,
  updateFixedExpense,
  updateFixedExpenseManual,
} from "services/fixedexpense.service";
import { formatToBRL } from "utils/pricing";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditFixedExpenses from "./ModalEdit";
import ModalAddCosts from "./ModalAddCosts";
import ModalAddFixedExpenses from "./AddFixedExpenses";
import { getErro, getSuccess } from "utils/ModalAlert";
import { formatDate } from "utils/date";
import Swal from "sweetalert2";
import PrintIcon from "@mui/icons-material/Print";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

export interface FixedExpenseType {
  id?: string;
  name: string;
  description: string;
  date: string;
  total_price: number;
  costs: CostType[];
  type: string;
}

const FixedExpensesTableView = () => {
  const [fixedExpenses, setFixedExpenses] = useState<FixedExpenseType[]>([]);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openAddFixedExpense, setOpenAddFixedExpense] = React.useState(false);
  const [currentCost, setCurrentCost] = React.useState<CostType | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const [selectedFixedExpense, setSelectedFixedExpense] =
    React.useState<FixedExpenseType | null>(null);
  const componentRef = useRef(null);

  const handleDeleteCost = async (costId: string) => {
    Swal.fire({
      title: "Tem certeza de que deseja excluir este custo?",
      text: "Esta ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCost(costId);

          if (selectedFixedExpense && selectedFixedExpense.costs) {
            const updatedCosts = selectedFixedExpense.costs.filter(
              (cost) => cost.id !== costId
            );

            const totalCostsPrice = updatedCosts.reduce(
              (total, cost) => total + cost.price,
              0
            );

            const updatedFixedExpense = {
              ...selectedFixedExpense,
              costs: updatedCosts,
              total_price: totalCostsPrice,
            };

            setSelectedFixedExpense(updatedFixedExpense);

            setFixedExpenses((prevExpenses) =>
              prevExpenses.map((expense) =>
                expense.id === updatedFixedExpense.id
                  ? updatedFixedExpense
                  : expense
              )
            );

            Swal.fire("Excluído!", "O custo foi excluído.", "success");
          }
        } catch (error) {
          console.log("Erro ao deletar o custo:", error);
        }
      } else {
        Swal.fire("Cancelado", "O custo não foi excluído.", "error");
      }
    });
  };

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

  const exportToExcel = () => {
    if (!selectedFixedExpense || !selectedFixedExpense.costs) {
      return;
    }

    const data = selectedFixedExpense.costs.map((cost) => ({
      Despesa: cost.name,
      Descrição: cost.description,
      Valor: formatToBRL(cost.price),
    }));

    const ws = XLSX.utils.json_to_sheet(data);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Despesas");

    const fileName = `Gastos_Fixos_${selectedFixedExpense.name}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  function openEditModal(cost: any): void {
    setCurrentCost(cost);
    setOpenEdit(true);
  }

  async function handleEditModal(editedCost: any) {
    try {
      const updatedCost = await updateCost(editedCost);
      if (selectedFixedExpense && selectedFixedExpense.costs) {
        const updatedCosts = selectedFixedExpense.costs.map((cost) =>
          cost.id === updatedCost.id ? updatedCost : cost
        );

        const totalCostsPrice = updatedCosts.reduce(
          (total, cost) => total + cost.price,
          0
        );

        const updatedFixedExpense = {
          ...selectedFixedExpense,
          costs: updatedCosts,
          total_price: totalCostsPrice,
        };
        console.log("1", updatedFixedExpense);
        setSelectedFixedExpense(updatedFixedExpense);

        setFixedExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === updatedFixedExpense.id
              ? updatedFixedExpense
              : expense
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteFixedExpense = async (fixedExpenseId: string) => {
    Swal.fire({
      title: "Tem certeza de que deseja excluir esta despesa fixa?",
      text: "Esta ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteFixedExpense(fixedExpenseId);
          window.location.reload(); // Reload the page after deletion
        } catch (error) {
          console.log("Erro ao deletar despesa fixa:", error);
        }
      } else {
        Swal.fire("Cancelado", "A despesa fixa não foi excluída.", "error");
      }
    });
  };

  useEffect(() => {
    const fetchFixedExpenses = async () => {
      const result = await getFixedExpense();
      setFixedExpenses(result.results);
    };

    fetchFixedExpenses();
  }, []);

  async function handleCostsUpdate(newCosts: CostType): Promise<void> {
    try {
      const response = await saveCost(newCosts);
      const ids = selectedFixedExpense?.costs.map((item) => item?.id);
      ids?.push(response.costs[0].id);
      const update = await updateFixedExpense(selectedFixedExpense, ids);
      console.log(update);
      setSelectedFixedExpense(update);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleFixedExpensesUpdate(values: FixedExpenseType) {
    try {
      const response = await updateFixedExpenseManual(values);
      console.log(response);
      setSelectedFixedExpense(values);
      getSuccess("Despesa fixa atualizada com sucesso!");
    } catch (error) {
      getErro("Erro ao atualizar despesa fixa!");
    }
  }

  return (
    <>
      <FormControl fullWidth margin="normal">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <InputLabel>Selecione a despesa</InputLabel>
            <Select
              fullWidth
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
          </Grid>
          {selectedFixedExpense && (
            <>
              <Grid item>
                <Button
                  fullWidth
                  color="secondary"
                  onClick={() =>
                    handleDeleteFixedExpense(selectedFixedExpense.id || "")
                  }
                  startIcon={<DeleteIcon sx={{ color: "red" }} />}
                />
              </Grid>
              <Grid></Grid>
              {selectedFixedExpense?.type === "manual" && (
                <Grid item>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => setOpenAddFixedExpense(!openAddFixedExpense)}
                    startIcon={<EditIcon sx={{ color: "blue" }} />}
                  />
                </Grid>
              )}
              <Button onClick={handlePrint} variant="outlined" sx={{ mr: 2 }}>
                <PrintIcon />
              </Button>
              <Button onClick={exportToExcel} variant="outlined">
                <CloudDownloadIcon />
              </Button>
            </>
          )}
          {selectedFixedExpense && (
            <>
              <Grid item xs={12}>
                <Typography>
                  Descrição: {selectedFixedExpense.description}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  Data: {formatDate(selectedFixedExpense.date)}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </FormControl>
      <div ref={componentRef}>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Despesa</TableCell>
                <TableCell align="center">Descrição</TableCell>
                <TableCell align="center">Valor</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedFixedExpense?.costs.map((cost, index) => (
                <TableRow
                  key={cost.id}
                  sx={{
                    backgroundColor: index % 2 !== 0 ? "#ffffff" : "#f2f2f2",
                  }}
                >
                  <TableCell align="center">{cost.name}</TableCell>
                  <TableCell align="center">{cost.description}</TableCell>
                  <TableCell align="center">
                    {formatToBRL(cost.price)}
                  </TableCell>
                  <TableCell align="center">
                    {!isGeneratingPDF && (
                      <>
                        <Button
                          onClick={() => cost.id && handleDeleteCost(cost.id)}
                          color="secondary"
                          startIcon={<DeleteIcon sx={{ color: "red" }} />}
                        />
                        <Button
                          onClick={() => openEditModal(cost)}
                          color="primary"
                          startIcon={<EditIcon sx={{ color: "blue" }} />}
                        />
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {!selectedFixedExpense ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Nenhuma despesa selecionada
                  </TableCell>
                </TableRow>
              ) : !selectedFixedExpense.costs ||
                selectedFixedExpense.costs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Nenhuma despesa cadastrada
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
        {selectedFixedExpense && (
          <>
            <Grid sx={{ margin: "10px" }}>
              <Typography variant="subtitle1" align="right">
                Preço Total: {formatToBRL(selectedFixedExpense.total_price)}
              </Typography>
            </Grid>
          </>
        )}
      </div>
      {selectedFixedExpense?.type === "automatic" && (
        <ModalAddCosts onCostsUpdate={handleCostsUpdate} />
      )}
      <EditFixedExpenses
        open={openEdit}
        cost={currentCost}
        onClose={() => setOpenEdit(false)}
        onUpdate={handleEditModal}
      />
      {selectedFixedExpense?.type === "manual" && (
        <ModalAddFixedExpenses
          onFixedExpensesUpdate={handleFixedExpensesUpdate}
          onClose={() => setOpenAddFixedExpense(false)}
          open={openAddFixedExpense}
          fixedExpenses={selectedFixedExpense}
        />
      )}
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

export default FixedExpensesTableView;
