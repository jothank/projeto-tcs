import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material'
import AddComboPricing from './AddComboPricing';
import { ProductTableProps } from 'types/Product.types';
import { getAllProduct } from 'services/product.service';
import { AddProductPricing } from './AddProductPricing';


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
        marginLeft: "15%"
      }}
    >
      <Button onClick={toggleSimulator} variant='contained'>
        {isProductSimulatorVisible ? ' Simulador de Produtos' : 'Simulador de Combos'}
      </Button>
      {isProductSimulatorVisible ? <AddProductPricing data={supplies.data} /> : <AddComboPricing />}
    </Grid>
  );
}

export default PricingSimulator;