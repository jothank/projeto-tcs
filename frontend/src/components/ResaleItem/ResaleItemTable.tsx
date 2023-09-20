import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Grid } from '@mui/material';
import { ContainerResaleItem } from './ContainerResaleItem';

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
        <Typography>Adicionar</Typography>
    </Grid>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell>Quantidade</TableCell>
          <TableCell>Unidades</TableCell>
          <TableCell>Valor</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, rowIndex) => (
          <TableRow key={rowIndex}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.units}</TableCell>
            <TableCell>{item.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
     
    </Table>
    </>
  );
 
}
