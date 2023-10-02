import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getErro } from "utils/ModalAlert";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import React from "react";
import { ButtonContainer } from "components/ButtonContainer/ButtonContainer";
import { FixedExpenseType } from "types/FixedExpenses.type";
import AddFixedExpense from "./AddFixedExpense";
type CustomTableProps = {
    data: FixedExpenseType[];
};

export function FixedExpenseTable(props: CustomTableProps) {
    const componentRef = React.useRef(null);

    const { data } = props;

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
                    <ButtonContainer>
                        <AddFixedExpense />
                        <Button onClick={handlePrint} variant="outlined">
                            <PrintIcon />
                        </Button>
                    </ButtonContainer>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Preço</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, rowIndex) => (
                            <TableRow key={rowIndex}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>R${item.value},00</TableCell>

                            </TableRow>
                        ))}

                        <TableCell>Gasto Total</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableBody>

                </Table>
            </div>
        </>
    );
}
