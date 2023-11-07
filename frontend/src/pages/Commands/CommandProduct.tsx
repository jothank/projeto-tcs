import { Grid } from "@mui/material";
import CommandsComboTable from "components/Commands/CommandsComboTable";
import CommandsProductTable from "components/Commands/CommandsProductTable"
import React, { useEffect, useState } from "react"
import { getCombos } from "services/combo.service";
import { getAllProduct } from "services/product.service";
import { ProductTableProps } from "types/Product.types";


export const CommandProduct = () => {
    const [supplies, setSupplies] = useState<ProductTableProps>({
        data: {
            results: [],
        },
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProduct();
                setSupplies({ data: { results: data } });
            } catch (error: any) {
                console.error("Failed to fetch feedstocks:", error.message);
            }
        };

        fetchProducts();
    }, []);

    const [combos, setCombos] = useState<any[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getCombos();
                setCombos(data);
            } catch (error: any) {
                console.error("Failed to fetch feedstocks:", error.message);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <Grid container 
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px"                
            }}
            >
                <Grid item>
                    <CommandsProductTable data={supplies.data} />
                </Grid>
                <Grid item>
                <CommandsComboTable data={combos} />
                </Grid>
                
            </Grid>
        </>
    )
}

export default CommandProduct;