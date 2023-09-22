import React, { ReactNode } from "react";
import { Paper, Grid } from "@mui/material";

interface ContainerResaleItemValues {
    children: ReactNode;
    sizeForm: string;
    heightForm: string;
}

export const ContainerResaleItem: React.FC<ContainerResaleItemValues> = ({
    children,
    sizeForm,
    heightForm
}) => {

    return (
        <Paper >
            <Grid container
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                }}
            >
                <Grid item
                 sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    width: sizeForm,
                    height: heightForm,
                    padding: "20px",
                    "@media (max-width: 600px)": {
                      width: "90%",
                    },
                    border: "1px solid #E5E5E5",
                  }}
                >
                {children}
                </Grid>
            </Grid>
        </Paper>
    )
}