import CommandsProductTable from "components/Commands/CommandsProductTable"
import React, { useEffect, useState } from "react"
import { getAllProduct } from "services/product.service";
import { ProductTableProps } from "types/Product.types";


export const CommandProduct = () => {
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
    
      return <CommandsProductTable data={supplies.data} />;
}

export default CommandProduct;