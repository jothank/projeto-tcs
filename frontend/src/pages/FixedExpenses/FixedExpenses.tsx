import React, { useState, useEffect } from "react";
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
