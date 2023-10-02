import React, { useEffect, useState } from "react";
import { getAllProductRegistration } from "services/productRegistration.service";
import { FeedstockType } from "types/Feedstock.type";
import { ContainerResaleItem } from "components/ResaleItem/ContainerResaleItem";
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
        const data = await getAllProductRegistration();
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
