import React, { useEffect, useRef, useState } from "react"
import { getAllfeedstocks } from "services/feedstock.service";
import { FeedstockType } from "types/Feedstock.type";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    TableContainer,
  } from "@mui/material";
import { formatToBRL } from "utils/pricing";
import { ProductTableProps } from "types/Product.types";
import FinancialComponent from "./FinancialComponent";

export const AddProductPricing = ({ data }: ProductTableProps) => {
    const componentRef = useRef(null);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(
      data?.results.length ? data.results[0].id : null
    );
    const selectedProduct = data.results.find(
      (product) => product.id === selectedProductId
    );
    const [feedstockList, setFeedstockList] = useState<FeedstockType[]>([]);
    useEffect(() => {
      const fetchFeedstocks = async () => {
        try {
          const result = await getAllfeedstocks();
          setFeedstockList(result);
        } catch (error) {
          console.error("Failed to fetch feedstocks:", error);
        }
      };
      fetchFeedstocks();
    }, []);
  
    return (
      <Paper
    sx={{widht: "70%"}}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <Typography variant="h6" component="div">
            {selectedProduct
              ? selectedProduct.name
              : "Nenhum produto selecionado"}
          </Typography>
          
        
          <FormControl sx={{ width: "40%" }}>
            <InputLabel>Selecione o produto</InputLabel>
            <Select
              value={selectedProductId || ""}
              onChange={(event) =>
                setSelectedProductId(event.target.value as number)
              }
            >
              {data.results.map((productItem) => (
                <MenuItem key={productItem.id} value={productItem.id}>
                  {productItem.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div ref={componentRef}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Insumo</TableCell>
                  <TableCell align="center">Unidade de Fabricação</TableCell>
                  <TableCell align="center">Quantidade de uso</TableCell>
                  <TableCell align="center">Unidade de aquisição</TableCell>
                  <TableCell align="center">Valor de aquisição</TableCell>
                  <TableCell align="center">Valor unitário</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedProduct ? (
                  selectedProduct.supplies.map((product, index) => (
                    <TableRow
                      key={`${product.id}-${index}`}
                      sx={{
                        backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff"
                      }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {product.feedstock.name}
                      </TableCell>
                      <TableCell align="center">{product.unit}</TableCell>
                      <TableCell align="center">{product.quantity}</TableCell>
                      <TableCell align="center">
                        {product.feedstock.unit}
                      </TableCell>
                      <TableCell align="center">
                        {formatToBRL(product.feedstock.price)}
                      </TableCell>
                      <TableCell align="center">
                        {formatToBRL(product.price)}
                      </TableCell>
                      <TableCell align="center">
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      Nenhum produto selecionado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {selectedProduct && (
            <>
              <Typography
                variant="subtitle1"
                align="right"
                style={{ padding: 16 }}
              >
                Custo de produção: {formatToBRL(selectedProduct.price)}
              </Typography>
            </>
          )}
        </div>
       <FinancialComponent />
      </Paper>
    );
    
}