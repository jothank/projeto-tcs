import React, { useEffect, useState } from "react";
import { getAllProduct } from "services/productRegistration.service";
import ProductTable, {
  ProductTableProps,
} from "components/Product/ProductTable";

const Product: React.FC = () => {
  const [feedstocks, setFeedstocks] = useState<ProductTableProps>({
    data: {
      results: [],
    },
  });

  useEffect(() => {
    const fetchFeedstocks = async () => {
      try {
        const data = await getAllProduct();
        setFeedstocks({ data: { results: data } });
      } catch (error: any) {
        console.error("Failed to fetch feedstocks:", error.message);
      }
    };

    fetchFeedstocks();
  }, []);

  return <ProductTable data={feedstocks.data} />;
};

export default Product;
