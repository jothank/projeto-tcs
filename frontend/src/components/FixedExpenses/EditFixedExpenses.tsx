import React, { useState } from 'react';
import { TableRow, TableCell, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import { formatToBRL } from 'utils/pricing';

export const EditExpenseRow = ({ cost, onEdit, onDelete, onSave, isEditing }: any) => {
  const [editedCost, setEditedCost] = useState(cost);

  const handleEdit = () => {
    onEdit();
  };

  const handleSave = () => {
    onSave(editedCost);
  };

  const hadleDelete =  () => {
    onDelete()
  }

  return (
    <TableRow>
      <TableCell>
        {isEditing ? (
          <TextField
            value={editedCost.name}
            onChange={(e) => setEditedCost({ ...editedCost, name: e.target.value })}
          />
        ) : (
          cost.name
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <TextField
            value={editedCost.nameExpense}
            onChange={(e) => setEditedCost({ ...editedCost, nameExpense: e.target.value })}
          />
        ) : (
          cost.nameExpense
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <TextField
            value={editedCost.description}
            onChange={(e) => setEditedCost({ ...editedCost, description: e.target.value })}
          />
        ) : (
          cost.description
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <TextField
            value={editedCost.price}
            onChange={(e) => setEditedCost({ ...editedCost, price: e.target.value })}
          />
        ) : (
          formatToBRL(cost.price)
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <TextField
            value={editedCost.date}
            onChange={(e) => setEditedCost({ ...editedCost, date: e.target.value })}
          />
        ) : (
          cost.date
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Button onClick={handleSave}>Salvar</Button>
        ) : (
          <Button onClick={handleEdit}>
            <EditIcon />
          </Button>
        )}
       <Button>
        <DeleteIcon />
       </Button>
      </TableCell>
    </TableRow>
  );
};
