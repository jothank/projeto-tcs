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
            quantity: 10,
            units: 'unidades',
            value: 20.99,
        },
        {

            name: 'Produto 2',
            quantity: 5,
            units: 'caixas',
            value: 50.75,
        },
        {

            name: 'Produto 3',
            quantity: 25,
            units: 'unidades',
            value: 10.49,
        },
    ];

    console.log(data)

    return (
        <>
            <ContainerResaleItem
                sizeForm='800px'
                heightForm='800px'
            >
              
                <ResaleItemTable
                    data={data}

                />
            </ContainerResaleItem>
        </>
    )


}

export default ResaleItem;