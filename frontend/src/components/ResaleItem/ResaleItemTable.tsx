import React, {useState} from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Grid } from '@mui/material';
import AddResaleItem from './AddResaleItem';
import { EditResaleItem } from './EditResaleItem';
import { DeleteResaleItem } from './DeleteResaleItem';
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
              <Grid
              sx={{
                display: 'flex',
                flexDirection: 'row'
              }}
              >
                  <DeleteResaleItem />
                  <EditResaleItem  />
                  </Grid>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    </>
  );
 
}
