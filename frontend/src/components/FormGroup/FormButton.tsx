import React, { ReactNode } from "react";
import { Grid } from "@mui/material";

interface ContainerFormsProps {
  children: ReactNode;
}

const ButtonForms: React.FC<ContainerFormsProps> = ({ children }) => {
  return (
    <Grid
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {children}
    </Grid>
  );
};

export { ButtonForms };
