import { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow, MenuItem, Paper, Typography, Grid } from '@mui/material';
import MenuPopover from 'components/Action/MenuPopover';
import { Icon } from '@iconify/react';
import { LayoutBasePage } from 'layout';
import { TablePaginationActions } from 'components/TableActions/TableActions';
import TablePagination from '@mui/material/TablePagination';
import AddFixedExpense from './components/AddFixedExpense';
import { IFixedExpense, deleteFixedExpense, listAllFixedExpense } from 'services/fixedExpense.service';
import UpdateFixedExpense from './components/UpdateFixedExpense';


export default function FixedExpense() {
    const [ fixedExpenseData, setfixedExpenseData] = useState<IFixedExpense[]>([]);
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
  
  
    const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
      setOpenPopover(event.currentTarget);
    };
  
    const handleClosePopover = () => {
      setOpenPopover(null);
    };
  
    const fetchData = async () => {
      try {
        const response = await listAllFixedExpense();
        console.log(response.data)
        setfixedExpenseData(response.data || []);
      } catch (error) {
        console.error('Erro ao buscar dados do serviço:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleDelete = async (id: number) => {
      try {
        await deleteFixedExpense(id); 
        const updatedData = fixedExpenseData.filter((item) => item.id !== id); 
        setfixedExpenseData(updatedData); 
        handleClosePopover(); 
        console.log('Item excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir o item:', error);
      }
    };
  
  
    return (
      <>
        <LayoutBasePage title='Fixed Expense'>
          <Paper elevation={3} sx={{ marginTop: '5%' }}>
            <Grid
              sx={{
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'end',
  
              }}
            >
            <AddFixedExpense />
            </Grid>
            <Table>
  
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fixedExpenseData?.map((item) => (
                  <TableRow  >
                    <TableCell>
                      <Typography variant="subtitle2" noWrap>
                        {item.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      R$ {item.value}
                        </TableCell>
                    <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                      {item.description}
                    </TableCell>
                    <TableCell align="left"> 
                    {item.date}
                    </TableCell>
                    <TableCell align="right">
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
  
                        >
                          <MenuItem><UpdateFixedExpense /></MenuItem>
                       
                          <MenuItem
                             onClick={() => {
                              if (item.id !== undefined) {
                                handleDelete(item.id); 
                              } else {
                                console.error('ID do item é indefinido');
                              }
                            }}
                            sx={{ color: 'error.main' }}
                          >
                            Delete
                          </MenuItem>
                        </MenuPopover>
                      )}
                    </TableCell>
                  </TableRow>
                 ))} 
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              component="div"
              count={fixedExpenseData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </Paper>
        </LayoutBasePage>
      </>
    );

}