import React from "react";
import { FeedstockTable } from "components/Feedstock/FeedstockTable";
import { ContainerResaleItem } from "components/ResaleItem/ContainerResaleItem";
import { useEffect, useState } from "react";
import { getAllfeedstocks } from "services/feedstock.service";
import { FeedstockType } from "types/Feedstock.type";

export const Feedstock = () => {
  const [FeedstockData, setFeedstockData] = useState<FeedstockType[]>([]);
  useEffect(() => {
    const handleGet = async () => {
      try {
        const Feedstocks = await getAllfeedstocks();
        if (Array.isArray(Feedstocks)) setFeedstockData(Feedstocks);
      } catch (error) {
        console.error("Erro ao buscar os itens de lançamento:", error);
      }
    };

    handleGet();
  }, []);

  return (
    <>
      <ContainerResaleItem sizeForm="1550px" heightForm="100%">
        <FeedstockTable data={FeedstockData} />
      </ContainerResaleItem>
    </>
  );
};
