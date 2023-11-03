import React, { useState, useEffect } from "react";
import { ExpenseValueType } from "components/FixedExpenses/AddFixedExpenses copy";
import FixedExpensesTable from "components/FixedExpenses/FixedExpensesTable";
import { saveExpenses, getFixedExpense } from "services/fixedexpense.service copy";
import { getErro } from "utils/ModalAlert";
import { ExpenseType } from "types/FixedExpenses.types";
import AddFixedExpenses from "components/FixedExpenses/AddFixedExpenses copy";

const convertToExpenseType = (expenses: ExpenseValueType[]): ExpenseType[] => {
  return expenses.map((expense: ExpenseValueType) => {
    return {
      id: expense.id,
      nameExpense: expense.nameExpense || "",
      name: expense.nameExpense || "", // Aqui pode ser expense.name, dependendo de como você deseja mapear os campos.
      description: expense.description || "",
      date: expense.date || "",
      price: expense.price || 0,
    };
  });
};

export const FixedExpense = () => {
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data: ExpenseValueType[] = await getFixedExpense();
      const convertedExpenses: ExpenseType[] = convertToExpenseType(data);
      setExpenses(convertedExpenses);
    } catch (error) {
      console.error("Erro ao buscar as despesas:", error);
    }
  };

  const handleSaveExpense = async (newExpense: ExpenseType) => {
    try {
      await saveExpenses([newExpense]);
      fetchData();
    } catch (error) {
      console.error("Erro ao salvar a despesa:", error);
    }
  };

  return (
    <>
      <AddFixedExpenses
        onSave={(newExpense: ExpenseType) => handleSaveExpense(newExpense)}
        expensesValue={expenses as ExpenseValueType[]}
        setExpenses={setExpenses as React.Dispatch<React.SetStateAction<ExpenseValueType[]>>}
      />
      <FixedExpensesTable expensesValue={expenses} />
    </>
  );
};
