import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Grid } from '@mui/material';
import AddResaleItem from './AddResaleItem';
import { EditResaleItem } from './EditResaleItem';

import { deleteReleaseItem, getAllReleaseItems } from 'services/resealeItem.service';
import DeleteIcon from '@mui/icons-material/Delete';
import { getErro } from 'utils/ModalAlert';
type CustomTableProps<T> = {
  data: T[];
};

export function ResaleItemTable<T extends Record<string, any>>(props: CustomTableProps<T>) {
  const { data } = props;

  
  const handleDelete = async (itemId: number) => {
    try {
      await deleteReleaseItem(itemId);
      console.log(`Item com ID ${itemId} foi excluído com sucesso.`);
    } catch (error) {
      getErro(`Erro ao excluir o item com ID ${itemId}`);
    }
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
                  <Button
                    onClick={() => handleDelete(item.id)}
                  >
                    <DeleteIcon
                      style={{ cursor: 'pointer', marginRight: '10px', color: 'red' }}
                    />
                  </Button>
                  <EditResaleItem />
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </>
  );

}
