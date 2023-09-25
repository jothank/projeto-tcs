import React, { useState } from "react";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Grid,
    Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FeedstockType } from "types/Feedstock.type";
import ProductModal from "components/Product/AddProduct";
import { AddedFeedstockType, ProductTableProps } from "types/Product.types";
import { ButtonContainer } from "components/ButtonContainer/ButtonContainer";
import { setProductRegistration } from "services/productRegistration.service";

export interface RegistrationType {
    producion_price: number;
    products: any;
    id: number;
    name: string;
    unitFabrication?: string;
    quantityOfUse?: number;
    costUnit?: number;
    costTotal: number
}

export function ProductRegistrationTable({ feedstocks }: ProductTableProps) {
    const [open, setOpen] = useState(false);
    const [selectedFeedstock, setSelectedFeedstock] =
        useState<FeedstockType | null>(null);
    const [quantityOfUse, setQuantityOfUse] = useState<number | null>(null);
    const [selectedUnitFabrication, setSelectedUnitFabrication] = useState<
        string | null
    >(null);
    const [addedFeedstocks, setAddedFeedstocks] = useState<AddedFeedstockType[]>(
        []
    );
    const [totalCost, setTotalCost] = useState<number>(0);
    const [productsName, setProductsName] = useState<string>("");

    const handleAddItem = () => {
        if (
            !selectedFeedstock ||
            !quantityOfUse ||
            !selectedUnitFabrication ||
            !selectedFeedstock.id
        )
            return;

        let newQuantityOfUse = quantityOfUse;
        if (selectedUnitFabrication === "g" || selectedUnitFabrication === "ml") {
            newQuantityOfUse = newQuantityOfUse / 1000;
        }

        const factor = 100;
        const costUnit =
            Math.floor(newQuantityOfUse * selectedFeedstock.price * factor) / factor;

        const newItem: AddedFeedstockType = {
            id: selectedFeedstock.id,
            quantityOfUse: newQuantityOfUse,
            costUnit,
            unitFabrication: selectedUnitFabrication,
            name: selectedFeedstock.name,
            price: selectedFeedstock.price,
            quantity: 0,
            unit: selectedFeedstock.unit,
        };
        setTotalCost((prevTotalCost) => prevTotalCost + costUnit);
        setAddedFeedstocks((prev) => [...prev, newItem]);
        setOpen(false);
    };

    const handleDeleteItem = (itemToDelete: AddedFeedstockType) => {
        setAddedFeedstocks((prev) =>
            prev.filter((feedstock) => feedstock !== itemToDelete)
        );
    };

    const handleSaveRows = async () => {
        const productData = {
            name: productsName,
            products: addedFeedstocks,
            prurchedPrice: totalCost,
        };

        try {
            await setProductRegistration(
                productData.name,
                productData.products,
                productData.prurchedPrice
            );
            console.log("Produto salvo com sucesso.");
        } catch (error) {
            console.error("Houve um erro ao salvar o produto:", error);
        }
    };


    return (
        <div >
            <Grid
                sx={{
                    marginTop: '2%',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <TextField
                    label="Nome do Produto"
                    type="text"
                    onChange={(e) => setProductsName(e.target.value)}
                    sx={{ width: '50%' }}
                />
                <Grid
                    sx={{
                        display: 'flex',
                        gap: '20px'
                    }}
                >
                    <ButtonContainer>
                        <Button onClick={() => setOpen(true)} variant="contained">Cadastrar</Button>
                        <Button onClick={handleSaveRows} variant="contained" >Salvar </Button>
                    </ButtonContainer>
                </Grid>
            </Grid>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Insumo</TableCell>
                        <TableCell>
                            <Typography variant="subtitle2">Unidade de medida Fábrica</Typography>
                        </TableCell>
                        <TableCell>Quantidade / Uso</TableCell>
                        <TableCell>Preço de Compra</TableCell>
                        <TableCell>Unidade de medida</TableCell>
                        <TableCell>Custo unitário</TableCell>
                        <TableCell>Ação</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {addedFeedstocks.map((feedstock, index) => (
                        <TableRow key={index}>
                            <TableCell>{feedstock.name}</TableCell>
                            <TableCell>{feedstock.unitFabrication}</TableCell>
                            <TableCell>{feedstock.quantityOfUse}</TableCell>
                            <TableCell>R${feedstock.price},00</TableCell>
                            <TableCell>{feedstock.unit}</TableCell>
                            <TableCell>R${feedstock.costUnit},00</TableCell>
                            <TableCell>
                                <Button onClick={() => handleDeleteItem(feedstock)}>
                                    <DeleteIcon
                                        style={{
                                            cursor: "pointer",
                                            marginRight: "10px",
                                            color: "red",
                                        }}
                                    />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableRow>
                    <TableCell colSpan={5}>Custo Total de Produção</TableCell>
                    <TableCell>R${totalCost.toFixed(2)},00</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </Table>
            <Grid
                sx={{
                    marginTop: '2%',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >

            </Grid>
            <ProductModal
                open={open}
                onClose={() => setOpen(false)}
                feedstocks={feedstocks}
                onAddItem={handleAddItem}
                setSelectedFeedstock={setSelectedFeedstock}
                setQuantityOfUse={setQuantityOfUse}
                setSelectedUnitFabrication={setSelectedUnitFabrication}
            />
        </div>
    );
}

export default ProductRegistrationTable;
