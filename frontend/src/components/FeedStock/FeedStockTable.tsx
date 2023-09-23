import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getErro } from "utils/ModalAlert";
import { FeedStockType } from "types/FeedStock.type";
import EditFeedStock from "./EditFeedStock";
import { AddFeedStock } from "./AddFeedStock";
import { deleteFeedStock } from "services/feedStock.service";
import { useReactToPrint } from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';
import React from 'react'
import { ButtonContainer } from "components/ButtonContainer/ButtonContainer";
type CustomTableProps = {
  data: FeedStockType[];
};

export function FeedStockTable(props: CustomTableProps) {
  const componentRef = React.useRef(null);

  const { data } = props;

  const handleDelete = async (itemId: number) => {
    try {
      await deleteFeedStock(itemId);
      window.location.reload();
      console.log(`Item com ID ${itemId} foi excluído com sucesso.`);
    } catch (error) {
      getErro(`Erro ao excluir o item com ID ${itemId}`);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  return (
    <>   
    <div  ref={componentRef}>
      <Grid
        sx={{
          display: "flex",
          alignItems: "end",
          justifyContent: "end",
        }}
      >  
   
       <ButtonContainer>
        <AddFeedStock />
        <Button onClick={handlePrint} variant="outlined">
          <PrintIcon />
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
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.unity}</TableCell>
              
              <TableCell>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Button onClick={() => item.id && handleDelete(item.id)}>
                    <DeleteIcon
                      style={{
                        cursor: "pointer",
                        marginRight: "10px",
                        color: "red",
                      }}
                    />
                  </Button>
                  <EditFeedStock item={item} onClose={() => { }} />
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
      </div>
    </>
  );
}
