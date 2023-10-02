import AddFixedExpense from "components/FixedExpenses/AddFixedExpense";
import { FixedExpenseTable } from "components/FixedExpenses/FixedExpenseTable";
import { ContainerResaleItem } from "components/ResaleItem/ContainerResaleItem";
import React from "react";
const FixedExpense = () => {

    const data = [
    
    {
        name: "aluguel",
        value: 3000
    }
] 

    return (
        <>
        <ContainerResaleItem sizeForm="800px" heightForm="650px">
        <FixedExpenseTable data={data} />
      </ContainerResaleItem>
    </>
        )
};

export default FixedExpense;