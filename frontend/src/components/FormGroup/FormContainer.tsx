import React, { ReactNode } from "react";
import { Container, Grid } from "@mui/material";

interface ContainerFormsProps {
  children: ReactNode;
  sizeForm: string;
  titleForm: string;
}

const ContainerForms: React.FC<ContainerFormsProps> = ({
  children,
  sizeForm,
  titleForm,
}) => {
  return (
    <Grid
      item
      sx={{
        background:
          "radial-gradient(50% 50% at 50% 50%, #fcf49b 0%, #e9df87 100%)",
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          borderRadius: "10px",
          width: sizeForm,
          padding: "20px",
          "@media (max-width: 600px)": {
            width: "90%",
          },
        }}
      >
        <Grid
          sx={{
            width: "100%",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>{titleForm}</h1>
        </Grid>
        {children}
      </Container>
    </Grid>
  );
};

export default ContainerForms;
