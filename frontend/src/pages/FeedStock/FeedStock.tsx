import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LayoutBasePage } from 'layout';
import TableHead from '@mui/material/TableHead';
import { TablePaginationActions } from 'components/TableActions/TableActions';
import AddFeedStock from './components/AddFeedStrock';
import { Grid } from '@mui/material';
import MenuPopover from 'components/Action/MenuPopover';
import { MenuItem } from '@mui/material';
import { Icon } from '@iconify/react';

function createData(name: string, calories: number, fat: number) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <LayoutBasePage
      title='Feed Stock'
    >
      <TableContainer component={Paper}
        sx={{
          marginTop: '5%'

        }}
      >
        <Grid
          sx={{
            marginLeft: '90%',
            marginBottom: '2%'
          }}
        >
          <AddFeedStock />
        </Grid>
        <Paper elevation={3} >
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Qty.</TableCell>
                <TableCell align="left">Qty.</TableCell>
                <TableCell align="left">Qty.</TableCell>
                <TableCell align="right">Unit</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.calories}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <div
                      onClick={handleOpenPopover}
                      style={{ cursor: 'pointer' }}
                    >
                      <Icon icon="material-symbols:pending-outline" width="30" height="30" />
                    </div>
                    {openPopover && (
                      <MenuPopover
                      open={openPopover}
                        onClose={handleClosePopover}
                      // Coloque aqui as propriedades do MenuPopover que você deseja
                      >
                        <MenuItem>Editar</MenuItem>
                        <MenuItem>Visualizar</MenuItem>
                        <MenuItem>Excluir</MenuItem>
                      </MenuPopover>
                    )}
                  </TableCell>

                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>
      </TableContainer>
    </LayoutBasePage>
  );
}
