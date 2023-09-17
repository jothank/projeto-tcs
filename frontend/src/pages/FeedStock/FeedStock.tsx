import { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow, MenuItem, Paper, Typography, Grid } from '@mui/material';
import { IFeedStock, listAllFeedStock } from 'services/feedStock.service';
import MenuPopover from 'components/Action/MenuPopover';
import { Icon } from '@iconify/react';
import { LayoutBasePage } from 'layout';
import { TablePaginationActions } from 'components/TableActions/TableActions';
import TablePagination from '@mui/material/TablePagination';
import AddFeedStock from './components/AddFeedStrock';


export default function FeedStock() {
  const [feedStockData, setFeedStockData] = useState<IFeedStock[]>([]);
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
      const response = await listAllFeedStock();
      console.log(response.data)
      setFeedStockData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados do serviço:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <LayoutBasePage title='FeedStock'>
        <Paper elevation={3} sx={{ marginTop: '5%' }}> 
        <Grid
        sx={{
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'end',
         
        }}
        >
      <AddFeedStock />
      </Grid>
        <Table>
       
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Unidades</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedStockData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Typography variant="subtitle2" noWrap>
                    {item.name}
                  </Typography>
                </TableCell>
                <TableCell align="left">{item.quantity}</TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                  {item.units}
                </TableCell>
                <TableCell align="left">R$ {item.value}</TableCell>
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
                      <MenuItem>Editar</MenuItem>
                      <MenuItem>Visualizar</MenuItem>
                      <MenuItem>Excluir</MenuItem>
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
          count={feedStockData.length} 
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
