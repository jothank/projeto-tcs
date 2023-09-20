import React, {useState} from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Grid } from '@mui/material';
import { ContainerResaleItem } from './ContainerResaleItem';
import AddResaleItem from './AddResaleItem';
import { TablePaginationActions } from 'components/TableActions/TablePaginationActions';

type CustomTableProps<T> = {
  data: T[]; 
};

export function ResaleItemTable<T extends Record<string, any>>(props: CustomTableProps<T>) {
  const { data } = props;

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };


  return (
    <>
    <Grid
    sx={{
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'end'
    }}
    >
        <AddResaleItem />
    </Grid>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell>Descrição</TableCell>
          <TableCell>Preço de compra</TableCell>
          {/* <TableCell>Valor</TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, rowIndex) => (
          <TableRow key={rowIndex}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.purchase_price}</TableCell>
            {/* <TableCell>{item.value}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    </>
  );
 
}
