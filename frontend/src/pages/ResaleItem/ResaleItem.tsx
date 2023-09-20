import { ContainerCompany } from "components/Company/ContainerCompany";
import { CustomTable } from "components/Table/CustomTable";
import React from "react"



export const ResaleItem = () => {

    const columns = [
        { header: 'Nome', field: 'name' },
        { header: 'Quantidade', field: 'quantity' },
        { header: 'Unidades', field: 'units' },
        { header: 'Valor', field: 'value' },
    ];

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

    return (
        <>
            
                <CustomTable
                    columns={columns}
                    data={data}
                    openPopover={false}
                    handleClosePopover={() => {
                        // Lógica para fechar o popover
                    }}
                />
        </>
    )


}

export default ResaleItem;