import React, { useState, useEffect } from "react";
import { getErro } from "utils/ModalAlert";
import { ExpenseType } from "types/FixedExpenses.types";
import AddFixedExpenses from "components/FixedExpenses/AddCosts";
import FixedExpensesTable from "components/FixedExpenses/FixedExpensesTable";
import Container from "@mui/material/Container";

export const FixedExpense = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
    } catch (error) {
      console.error("Erro ao buscar as despesas:", error);
    }
  };

  return (
    <Container>
      <FixedExpensesTable />
    </Container>
  );
};
