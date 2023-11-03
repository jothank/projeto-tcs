import React, { useState, useEffect } from "react";
import AddFixedExpenses from "components/FixedExpenses/AddFixedExpenses";
import FixedExpensesTable from "components/FixedExpenses/FixedExpensesTable";
import { saveExpenses, getFixedExpense } from "services/fixedexpense.service copy"; // Modifique para importar as funções corretas do seu serviço
import { getErro } from "utils/ModalAlert";
import { ExpenseType } from "types/FixedExpenses.types";

export const FixedExpense = () => {
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data: ExpenseType[] = await getFixedExpense();
      setExpenses(data);
    } catch (error) {
      console.error("Erro ao buscar as despesas:", error);
    }
  };

  const handleSaveExpense = async (newExpense: ExpenseType[]) => {
    try {
      await saveExpenses(newExpense);
      fetchData();
    } catch (error) {
      console.error("Erro ao salvar a despesa:", error);
    }
  };

  return (
    <>
      <AddFixedExpenses onSave ={handleSaveExpense} />
      <FixedExpensesTable expensesValue={expenses} />
    </>
  );
};
