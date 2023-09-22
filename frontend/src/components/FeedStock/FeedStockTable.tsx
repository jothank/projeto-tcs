import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Grid,
  } from "@mui/material";
//   import AddResaleItem from "./AddResaleItem";
//   import { EditResaleItem } from "./EditResaleItem";
  import { ResaleItemType } from "types/resaleItem.types";
  
  import {
    deleteReleaseItem,
    getAllReleaseItems,
  } from "services/resealeItem.service";
  import DeleteIcon from "@mui/icons-material/Delete";
  import { getErro } from "utils/ModalAlert";
import { FeedStockType } from "types/FeedStock.type";
import EditFeedStock from "./EditFeedStock";
import { AddFeedStock } from "./AddFeedStock";
  
  type CustomTableProps = {
    data: FeedStockType[];
  };
  
  export function FeedStockTable(props: CustomTableProps) {
    const { data } = props;
  
    const handleDelete = async (itemId: number) => {
      try {
        await deleteReleaseItem(itemId);
        window.location.reload();
        console.log(`Item com ID ${itemId} foi excluído com sucesso.`);
      } catch (error) {
        getErro(`Erro ao excluir o item com ID ${itemId}`);
      }
    };
  
    return (
      <>
        <Grid
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "end",
          }}
        >
          <AddFeedStock />
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
                    <EditFeedStock item={item} onClose={() => {}} />
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }
  