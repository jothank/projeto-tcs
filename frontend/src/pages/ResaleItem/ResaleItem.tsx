import { ContainerCompany } from "components/Company/ContainerCompany";
import { ContainerResaleItem } from "components/ResaleItem/ContainerResaleItem";
import { ResaleItemTable } from "components/ResaleItem/ResaleItemTable";
import React, { useState } from "react"
import Typography from '@mui/material/Typography';


export const ResaleItem = () => {
    const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
    const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
        setOpenPopover(event.currentTarget);
    };




    const data = [
        {

            name: 'Produto 1',
            description: 'teste',
            purchase_price: 20.99,
        },
        {

            name: 'Produto 2',
            description: 'teste2',
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