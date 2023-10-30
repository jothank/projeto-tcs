import React, { useState, useEffect } from "react";
import AddFixedExpenses, { ExpenseValueType } from "components/FixedExpenses/AddFixedExpenses";
import FixedExpensesTable from "components/FixedExpenses/FixedExpensesTable";
import { getFixedExpense } from "services/fixedexpense.service";
import { getErro } from "utils/ModalAlert";
// Substitua pelo serviço correto

export const FixedExpense = () => {
  const [expenses, setExpenses] = useState<ExpenseValueType[]>([]);

  useEffect(() => {
    getFixedExpense()
      .then((expense) => {
        setExpenses(expense);
      })
      .catch((error) => {
        getErro("Erro ao buscar as despesas")
      });
  }, []); 

  return (
    <>
      <AddFixedExpenses expensesValue={expenses} setExpenses={setExpenses} />
      <FixedExpensesTable expensesValue={expenses} setExpenses={setExpenses} />
    </>
  );
};