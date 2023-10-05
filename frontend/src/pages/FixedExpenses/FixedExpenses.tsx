import AddFixedExpenses, { Expense } from "components/FixedExpenses/AddFixedExpenses";
import FixedExpensesTable from "components/FixedExpenses/FixedExpensesTable";
import React, { useState } from "react";

export const FixedExpense = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]); 
  
    return (
      <>
        <AddFixedExpenses expenses={expenses} setExpenses={setExpenses} /> 
        <FixedExpensesTable expenses={expenses} />
      </>
    );
  };