import React from "react";
import { ContainerResaleItem } from "components/ResaleItem/ContainerResaleItem";
import { useEffect, useState } from "react";
import { getAllfeedstocks } from "services/feedstock.service";
import { FeedstockType } from "types/Feedstock.type";
import { ProductTable } from "components/Product/ProductTable";

export const Product = () => {
  const [feedstocks, setFeedstocks] = useState<FeedstockType[]>([]);

  const handleAddItem = (newItem: FeedstockType) => {
    setFeedstocks((prevFeedstocks) => [...prevFeedstocks, newItem]);
  };

  useEffect(() => {
    const fetchFeedstocks = async () => {
      try {
        const data = await getAllfeedstocks();
        setFeedstocks(data);
      } catch (error: any) {
        console.error("Failed to fetch feedstocks:", error.message);
      }
    };

    fetchFeedstocks();
  }, []);

  return (
    <>
      <ContainerResaleItem sizeForm="800px" heightForm="650px">
        <ProductTable feedstocks={feedstocks} />
      </ContainerResaleItem>
    </>
  );
};
