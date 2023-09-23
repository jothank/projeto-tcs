import { FeedStockTable } from "components/FeedStock/FeedStockTable"
import { ContainerResaleItem } from "components/ResaleItem/ContainerResaleItem"
import { useEffect, useState } from "react";
import { getAllFeedStocks } from "services/feedStock.service";
import { FeedStockType } from "types/FeedStock.type";


export const FeedStock = () => {
  const [feedStockData, setFeedStockData] = useState<FeedStockType[]>([]);
  useEffect(() => {
    const handleGet = async () => {
      try {
        const feedStocks = await getAllFeedStocks();
        console.log(feedStocks);
        if (Array.isArray(feedStocks)) setFeedStockData(feedStocks);
      } catch (error) {
        // Lide com erros, se necessário
        console.error("Erro ao buscar os itens de lançamento:", error);
      }
    };

    handleGet();
  }, []);


    const data = [
        {
            id: 1,
            name: 'Queijo',
            price: 10,
            quantity: 10,
            unity: 'kg'
        }
    ]

    return (

        
        <>

        <ContainerResaleItem sizeForm="800px" heightForm="650px">
          <FeedStockTable data={feedStockData} />
        </ContainerResaleItem>
      </>
    )
}