import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getErro } from "utils/ModalAlert";
import { FeedstockType } from "types/Feedstock.type";
import EditFeedstock from "components/Feedstock/EditFeedstock";
import { AddFeedstock } from "components/Feedstock/AddFeedstock";
import { deletefeedstock } from "services/feedstock.service";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { ButtonContainer } from "components/ButtonContainer/ButtonContainer";

type CustomTableProps = {
  data: FeedstockType[];
};

export function FeedstockTable(props: CustomTableProps) {
  const componentRef = React.useRef(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<FeedstockType | null>(null);

  const { data } = props;

  const handleDelete = (item: FeedstockType) => {
    setItemToDelete(item);
    setDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete && itemToDelete.id) {
      try {
        await deletefeedstock(itemToDelete.id);
        console.log(`Item com ID ${itemToDelete.id} foi excluído com sucesso.`);
        window.location.reload();
      } catch (error) {
        getErro(`Erro ao excluir o item com ID ${itemToDelete.id}`);
      }
    }
    setDialogOpen(false);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const exportToCSV = () => {
    const header = 'Nome,Preço,Quantidade,Unidade';
  
    const csvData = data.map(item => `${item.name},${item.price},${item.quantity},${item.unit}`).join('\n');
  
    const csvContent = `${header}\n${csvData}`;
  
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'feedstock_data.csv';
    a.click();
  };

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
            <AddFeedstock />
            <Button onClick={handlePrint} variant="outlined">
              <PrintIcon />
            </Button>
            <Button onClick={exportToCSV} variant="outlined">
              <CloudDownloadIcon />
            </Button>
          </ButtonContainer>
        </Grid>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Unidade</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{item.name}</TableCell>
                <TableCell>R${item.price},00</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unit}</TableCell>

                <TableCell>
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Button onClick={() => handleDelete(item)}>
                      <DeleteIcon
                        style={{
                          cursor: "pointer",
                          marginRight: "10px",
                          color: "red",
                        }}
                      />
                    </Button>
                    <EditFeedstock item={item} onClose={() => {}} />
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirmação</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir este item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button onClick={confirmDelete} color="error">
            Confirmar Exclusão
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
