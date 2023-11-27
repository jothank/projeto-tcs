import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Grid,
  TableContainer,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { FeedstockType } from "types/Feedstock.type";
import EditFeedstock from "components/Feedstock/EditFeedstock";
import { AddFeedstock } from "components/Feedstock/AddFeedstock";
import { formatToBRL } from "utils/pricing";
import Swal from "sweetalert2";
import { deletefeedstock } from "services/feedstock.service";
import { getErro } from "utils/ModalAlert";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

type CustomTableProps = {
  data: FeedstockType[];
};

export function FeedstockTable({ data }: CustomTableProps) {
  const componentRef = React.useRef(null);
  const [allData, setAllData] = useState(data);
  const [localData, setLocalData] = useState(data);
  const [filter, setFilter] = useState("all");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    setAllData(data);
    setLocalData(data);
  }, [data]);

  const filterData = (filterValue: string, data: FeedstockType[]) => {
    if (filterValue === "all") {
      return data;
    } else {
      return data.filter((item) => item.type === filterValue);
    }
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const filterValue = event.target.value;
    setFilter(filterValue);
    setLocalData(filterData(filterValue, allData));
  };

  const handleItemUpdated = (updatedItem: FeedstockType) => {
    const updatedAllData = allData.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setAllData(updatedAllData);

    setLocalData(filterData(filter, updatedAllData));
  };

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
            const updatedAllData = allData.filter(
              (dataItem) => dataItem.id !== item.id
            );
            setAllData(updatedAllData);
            setLocalData(filterData(filter, updatedAllData));

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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => {
      setIsGeneratingPDF(true);
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1);
      });
    },
    onAfterPrint: () => {
      setIsGeneratingPDF(false);
    },
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
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          padding={1}
        >
          <AddFeedstock />
          <Select
            value={filter}
            onChange={handleFilterChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{ width: "40%", mr: 2 }}
          >
            <MenuItem value="all">Todos os Itens</MenuItem>
            <MenuItem value="Feedstock">Insumos</MenuItem>
            <MenuItem value="ResaleItem">Itens para Revenda</MenuItem>
          </Select>
          <Grid>
            <Button onClick={handlePrint} variant="outlined" sx={{ mr: 2 }}>
              <PrintIcon />
            </Button>
            <Button onClick={exportToExcel} variant="outlined">
              <CloudDownloadIcon />
            </Button>
          </Grid>
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
                    {!isGeneratingPDF && (
                      <>
                        <Grid
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            marginRight: "50px",
                          }}
                        >
                          <Button onClick={() => handleDelete(item)}>
                            <DeleteIcon
                              style={{
                                cursor: "pointer",
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
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {isGeneratingPDF && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isGeneratingPDF}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}
