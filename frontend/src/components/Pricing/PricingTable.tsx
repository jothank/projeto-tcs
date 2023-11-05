import React, { useEffect, useState } from 'react';
import { AddProductPricing } from './AddProductPrincing';
import { Button, Grid } from '@mui/material'
import AddComboPricing from './AddComboPricing';
import { ProductTableProps } from 'types/Product.types';
import { getAllProduct } from 'services/product.service';


function PricingSimulator() {
  const [isProductSimulatorVisible, setIsProductSimulatorVisible] = useState(true);

  const toggleSimulator = () => {
    setIsProductSimulatorVisible(!isProductSimulatorVisible);
  };
  const [supplies, setSupplies] = useState<ProductTableProps>({
    data: {
      results: [],
    },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProduct();
        setSupplies({ data: { results: data } });
      } catch (error: any) {
        console.error("Failed to fetch feedstocks:", error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Grid
    sx={{
      widht: "80%",
      marginLeft: "5%"
    }}
    >
      <Button onClick={toggleSimulator} variant='outlined'>
        {isProductSimulatorVisible ? ' Simulador de Produtos' : 'Simulador de Combos'}
      </Button>
      {isProductSimulatorVisible ? <AddProductPricing data={supplies.data} /> : <AddComboPricing />}
    </Grid>
  );
}

export default PricingSimulator;
