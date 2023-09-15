import React, { ReactNode } from "react";
import { Grid } from "@mui/material";

interface TitleFormsProps {
  children: ReactNode;
}

const TitleForms: React.FC<TitleFormsProps> = ({ children }) => {
  return (
    <Grid
      sx={{
        width: "100%",
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Grid>
  );
};

export { TitleForms };
