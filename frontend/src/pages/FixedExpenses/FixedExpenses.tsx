import AddFixedExpenses, { ExpenseValueType } from "components/FixedExpenses/AddFixedExpenses";
import FixedExpensesTable from "components/FixedExpenses/FixedExpensesTable";
import React, { useState } from "react";

export const FixedExpense = () => {
    const [expenses, setExpenses] = useState<ExpenseValueType[]>([]); 
  
    return (
      <>
        <AddFixedExpenses expensesValue={expenses} setExpenses={setExpenses} /> 
        <FixedExpensesTable expensesValue={expenses} />
      </>
    );
  };