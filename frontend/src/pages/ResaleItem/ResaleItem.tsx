import React from "react";
import { ContainerResaleItem } from "components/ResaleItem/ContainerResaleItem";
import { ResaleItemTable } from "components/ResaleItem/ResaleItemTable";
import { useEffect, useState } from "react";
import { getAllReleaseItems } from "services/resealeItem.service";
import { ResaleItemType } from "types/resaleItem.types";

export const ResaleItem = () => {
  const [Resaledata, setResaleData] = useState<ResaleItemType[]>([]);
  useEffect(() => {
    const handleGet = async () => {
      try {
        const releaseItems = await getAllReleaseItems();
        console.log(releaseItems);
        if (Array.isArray(releaseItems)) setResaleData(releaseItems);
      } catch (error) {
        console.error("Erro ao buscar os itens de lançamento:", error);
      }
    };

    handleGet();
  }, []);

  return (
    <>
      <ContainerResaleItem sizeForm="800px" heightForm="650px">
        <ResaleItemTable data={Resaledata} />
      </ContainerResaleItem>
    </>
  );
};

export default ResaleItem;
