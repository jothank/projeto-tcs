import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Grid,
  TableContainer,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getErro } from "utils/ModalAlert";
import { FeedstockType } from "types/Feedstock.type";
import EditFeedstock from "components/Feedstock/EditFeedstock";
import { AddFeedstock } from "components/Feedstock/AddFeedstock";
import { deletefeedstock } from "services/feedstock.service";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { ButtonContainer } from "components/ButtonContainer/ButtonContainer";
import { formatToBRL } from "utils/pricing";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { AddResaleItem } from "./AddResaleItem";

type CustomTableProps = {
  data: FeedstockType[];
};

export function FeedstockTable(props: CustomTableProps) {
  const componentRef = React.useRef(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<FeedstockType | null>(
    null
  );
  const [localData, setLocalData] = React.useState<FeedstockType[]>([]);
  const [selectedList, setSelectedList] = React.useState<
    "all" | "noType" | "resale"
  >("all");

  React.useEffect(() => {
    const allFeedstocks = props.data;
    const feedstocksNoType = props.data.filter((feedstock) => !feedstock.type);
    const feedstocksResale = props.data.filter(
      (feedstock) => feedstock.type === "resale"
    );

    switch (selectedList) {
      case "all":
        setLocalData(allFeedstocks);
        break;
      case "noType":
        setLocalData(feedstocksNoType);
        break;
      case "resale":
        setLocalData(feedstocksResale);
        break;
      default:
        setLocalData(allFeedstocks);
    }
  }, [props.data, selectedList]);

  const handleDelete = (item: FeedstockType) => {
    Swal.fire({
      title: "Tem certeza de que deseja excluir este item?",
      text: "Esta ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (item && item.id) {
          try {
            await deletefeedstock(item.id);
            console.log(`Item com ID ${item.id} foi excluído com sucesso.`);
            setLocalData((prevData) =>
              prevData.filter((dataItem) => dataItem.id !== item.id)
            );
            Swal.fire("Excluído!", "O item foi excluído.", "success");
          } catch (error) {
            getErro(`Erro ao excluir o item com ID ${item.id}`);
          }
        }
      } else {
        Swal.fire("Cancelado", "O item não foi excluído.", "error");
      }
    });
  };
  const handleItemUpdated = (updatedItem: FeedstockType) => {
    setLocalData((prevData) =>
      prevData.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const confirmDelete = async () => {
    if (itemToDelete && itemToDelete.id) {
      try {
        await deletefeedstock(itemToDelete.id);
        console.log(`Item com ID ${itemToDelete.id} foi excluído com sucesso.`);
        setLocalData((prevData) =>
          prevData.filter((item) => item.id !== itemToDelete.id)
        );
      } catch (error) {
        getErro(`Erro ao excluir o item com ID ${itemToDelete.id}`);
      }
    }
    setDialogOpen(false);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.json_to_sheet(
      localData.map((item) => ({
        Nome: item.name,
        Preço: `R$ ${item.price}`,
        Quantidade: item.quantity,
        Unidade: item.unit,
      }))
    );

    XLSX.utils.book_append_sheet(wb, ws, "Dados");

    XLSX.writeFile(wb, "feedstock_data.xlsx");
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
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {[
            { component: <AddFeedstock />, key: "AddFeedstock" },
            { component: <AddResaleItem />, key: "AddResaleItem" },
            {
              onClick: () => setSelectedList("all"),
              label: "Todos os itens",
              key: "all",
            },
            {
              onClick: () => setSelectedList("noType"),
              label: "Somente insumos",
              key: "noType",
            },
            {
              onClick: () => setSelectedList("resale"),
              label: "Somente Items de revenda",
              key: "resale",
            },
            { onClick: handlePrint, icon: <PrintIcon />, key: "print" },
            {
              onClick: exportToExcel,
              icon: <CloudDownloadIcon />,
              key: "export",
            },
          ].map((button) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={button.key}>
              <Button
                onClick={button.onClick}
                variant="outlined"
                fullWidth
                startIcon={button.icon}
              >
                {button.label || button.component}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <div ref={componentRef}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ width: "30%" }}>
                  Nome
                </TableCell>
                <TableCell align="center">Preço</TableCell>
                <TableCell align="center">Quantidade</TableCell>
                <TableCell align="center">Unidade</TableCell>
                <TableCell align="center" sx={{ width: "10%" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {localData.map((item, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    backgroundColor: rowIndex % 2 === 0 ? "#f2f2f2" : "#ffffff",
                  }}
                >
                  <TableCell align="center" sx={{ width: "30%" }}>
                    {item.name}
                  </TableCell>
                  <TableCell align="center">
                    {formatToBRL(item.price)}
                  </TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">{item.unit}</TableCell>
                  <TableCell align="center" sx={{ width: "10%" }}>
                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <Button onClick={() => handleDelete(item)}>
                        <DeleteIcon
                          style={{
                            cursor: "pointer",
                            // marginRight: "10px",
                            color: "red",
                          }}
                        />
                      </Button>
                      <EditFeedstock
                        item={item}
                        onClose={() => {}}
                        onUpdated={handleItemUpdated}
                      />
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
