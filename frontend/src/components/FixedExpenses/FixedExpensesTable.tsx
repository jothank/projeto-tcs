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
  Typography,
  TableContainer,
  FormControl,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Formik, Form } from "formik";
import { FormInputDate, FormInputNumber } from "./FixedExpenseInput";
import AddFixedExpenses from "./AddFixedExpenses";
import { saveCosts, setFixedExpense } from "services/fixedexpense.service";
import { getErro, getSuccess } from "utils/ModalAlert";
import { CostType } from "./AddFixedExpenses";
import { formatToBRL } from "utils/pricing";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { validationSchema } from "utils/validations/validationsFixedExpense";
import EditFixedExpenses from "./ModalEdit";
import UnitSelect from "components/SelectOptions/SelectOptions";
import { optionsMonth } from "utils/FixedExpensesMonths";

const FixedExpensesTable = () => {
  const [costs, setCosts] = React.useState<CostType[]>([]);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentCost, setCurrentCost] = React.useState<CostType | null>(null);

  const handleOpenAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  const openEditModal = (cost: CostType) => {
    setCurrentCost(cost);
    setOpenEdit(true);
  };

  const handleCostsUpdate = (newCosts: CostType[]) => {
    setCosts(newCosts);
  };

  const handleRegister = async (values: any) => {
    try {
      if (!values.manualEntry) {
        const responseCosts = await saveCosts(costs);
        const ids = responseCosts.costs.map((element: any) => element.id);

        if (ids.length === 0) {
          throw new Error(
            "Por favor, adicione despesas ou insira um valor manualmente na opção 'Entrada manual' para definir as despesas fixas."
          );
        }
        const response = await setFixedExpense(
          values.name,
          values.date,
          undefined,
          ids,
          "automatic"
        );
      } else {
        const response = await setFixedExpense(
          values.name,
          values.date,
          values.manualValue,
          undefined,
          "manual"
        );
      }
      getSuccess("Despesas fixas salvas com sucesso!");
    } catch (error: any) {
      getErro(error.message);
    }
  };

  const handleDeleteCost = (index: number) => {
    const newCosts = [...costs];
    newCosts.splice(index, 1);
    setCosts(newCosts);
  };

  const handleUpdateCost = (updatedCost: CostType) => {
    setCosts((currentCosts) => {
      return currentCosts.map((cost) =>
        cost.id === updatedCost.id ? updatedCost : cost
      );
    });
    setOpenEdit(false);
  };
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          date: "",
          manualValue: 0,
          manualEntry: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ values, setFieldValue, setFieldTouched, setFieldError }) => (
          <>
            <Typography variant="h5">Despesas Fixas</Typography>

            <Form>
              <UnitSelect name="name" label="Mês" options={optionsMonth} />
              <FormInputDate name="date" label="Data Referência" type="date" />

              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenAddDialog}
                    disabled={values.manualEntry}
                  >
                    Adicionar custos
                  </Button>
                </Grid>

                <Grid item>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.manualEntry}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setFieldValue("manualEntry", checked);
                          setFieldValue(
                            "manualValue",
                            checked ? values.manualValue : 0
                          );
                          setFieldTouched("manualValue", false, false);
                          setFieldError("manualValue", "");
                        }}
                      />
                    }
                    label="Entrada Manual"
                  />
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <FormInputNumber
                      name="manualValue"
                      label="Valor Manual"
                      type="number"
                      disabled={!values.manualEntry}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid>
                <Button type="submit" variant="contained" color="primary">
                  Cadastrar despesas
                </Button>
              </Grid>
              {!values.manualEntry && (
                <Paper sx={{ width: "100%" }}>
                  <TableContainer>
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
                        {costs.length > 0 ? (
                          costs.map((cost, index) => (
                            <TableRow
                              key={cost.id}
                              sx={{
                                backgroundColor:
                                  index % 2 !== 0 ? "#ffffff" : "#f2f2f2",
                              }}
                            >
                              <TableCell align="center">{cost.name}</TableCell>
                              <TableCell align="center">
                                {cost.description}
                              </TableCell>
                              <TableCell align="center">
                                {formatToBRL(cost.price)}
                              </TableCell>
                              <TableCell align="center">
                                <Button onClick={() => handleDeleteCost(index)}>
                                  <DeleteIcon
                                    style={{
                                      cursor: "pointer",
                                      marginRight: "10px",
                                      color: "red",
                                    }}
                                  />
                                </Button>
                                <Button onClick={() => openEditModal(cost)}>
                                  <EditIcon
                                    style={{
                                      cursor: "pointer",
                                      marginRight: "10px",
                                      color: "blue",
                                    }}
                                  />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              align="center"
                              sx={{ color: "red" }}
                            >
                              Nenhuma despesa adicionada
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              )}
            </Form>
            <EditFixedExpenses
              open={openEdit}
              cost={currentCost}
              onClose={() => setOpenEdit(false)}
              onUpdate={handleUpdateCost}
            />
          </>
        )}
      </Formik>
      <AddFixedExpenses
        open={isAddDialogOpen}
        onClose={handleCloseAddDialog}
        onCostsUpdate={handleCostsUpdate}
      />
    </>
  );
};

export default FixedExpensesTable;
