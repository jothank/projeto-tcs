import React, {useState} from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Grid } from '@mui/material';
import AddResaleItem from './AddResaleItem';
import DeleteIcon from '@mui/icons-material/Delete'; 
import EditIcon from '@mui/icons-material/Edit'; 
type CustomTableProps<T> = {
  data: T[]; 
};

export function ResaleItemTable<T extends Record<string, any>>(props: CustomTableProps<T>) {
  const { data } = props;

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
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, rowIndex) => (
          <TableRow key={rowIndex}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.purchase_price}</TableCell>
            <TableCell>
                {/* Ícone de exclusão */}
                <DeleteIcon
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                />
                {/* Ícone de edição */}
                <EditIcon
                  style={{ cursor: 'pointer' }}
                />
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    </>
  );
 
}
