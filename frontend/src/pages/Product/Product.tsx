import React, { useEffect, useState } from "react";
import { getAllProduct } from "services/product.service";
import ProductTable from "components/Product/ProductTable";
import { ProductTableProps } from "types/Product.types";

const Product: React.FC = () => {
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

  return <ProductTable data={supplies.data} />;
};

export default Product;
