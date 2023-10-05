import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useReactToPrint } from "react-to-print";
import {AddFixedExpenses, Expense} from "./AddFixedExpenses";

 const FixedExpensesTable = ({ expenses }: { expenses: Expense[] }) => {

    const componentRef = React.useRef(null);
    // const { data } = props;
  
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });


    return (
      <>
       <div ref={componentRef}>
        <Grid
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "end",
          }}
        >
          
        </Grid>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {expenses.map((item: Expense, rowIndex: number) => (
              <TableRow key={rowIndex}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>R${item.value},00</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
             ))} 
          </TableBody>
        </Table>
        </div>
      </>
    );


}

export default FixedExpensesTable;