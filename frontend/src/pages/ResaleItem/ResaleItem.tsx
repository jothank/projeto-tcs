import { ContainerCompany } from "components/Company/ContainerCompany";
import { ContainerResaleItem } from "components/ResaleItem/ContainerResaleItem";
import { ResaleItemTable } from "components/ResaleItem/ResaleItemTable";
import React, { useEffect, useState } from "react"
import { getAllReleaseItems } from "services/resealeItem.service";
import { ResaleItemType } from 'types/resaleItem.types';

export const ResaleItem = () => {
    const [Resaledata, setResaleData] = useState<ResaleItemType[]>([]);
    useEffect(() => {
        const handleGet = async () => {
          try {
            const releaseItems = await getAllReleaseItems();
            setResaleData(releaseItems);
          } catch (error) {
            // Lide com erros, se necessário
            console.error('Erro ao buscar os itens de lançamento:', error);
          }
        };
    
        handleGet();
      }, []);
      
      const data = [
        {
            name: 'Produto 1',
            description: 'unidades',
            purchase_price: 20.99,
        },
        {
          name: 'Produto 1',
          description: 'unidades',
          purchase_price: 20.99,
        },
       
    ];

    return (
        <>
            <ContainerResaleItem
                sizeForm='800px'
                heightForm='650px'
            >
              
                <ResaleItemTable
                    data={data}

                />
            </ContainerResaleItem>
        </>
    )


}

export default ResaleItem;