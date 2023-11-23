import React, { useState, useEffect } from "react";
import { getErro } from "utils/ModalAlert";
import { ExpenseType } from "types/FixedExpenses.types";
import AddFixedExpenses from "components/FixedExpenses/AddCosts";
import FixedExpensesTable from "components/FixedExpenses/FixedExpensesTable";
import Container from "@mui/material/Container";
import { getFixedExpense } from "services/fixedexpense.service";
import FixedExpensesTableView from "components/FixedExpenses/FixedExpensesView";

export const FixedExpenseView = () => {
  return (
    <Container>
      <FixedExpensesTableView />
    </Container>
  );
};
