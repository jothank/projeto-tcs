import React, {useState, useEffect} from 'react';
import { Grid, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ProductTableProps } from 'types/Product.types';
import { FeedstockType } from 'types/Feedstock.type';
import { getAllfeedstocks } from 'services/feedstock.service';

const AddPricing = ({ data }: ProductTableProps) => {
    const [selectedProductId, setSelectedProductId] = useState<number | null>(
        data?.results.length ? data.results[0].id : null
      );
      const [feedstockList, setFeedstockList] = useState<FeedstockType[]>([]);  

      const selectedProduct = data.results.find(
        (product) => product.id === selectedProductId
      );
    
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
        <Grid
        sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "1%",
            gap: '20px'
        }}
        >
            
            <Typography variant="h6" component="div">
          {selectedProduct
            ? selectedProduct.name
            : "Nenhum produto selecionado"}
        </Typography>
            <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ width: "70%" }}>
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
            </Box>
        </Grid>
    )

}

export default AddPricing;