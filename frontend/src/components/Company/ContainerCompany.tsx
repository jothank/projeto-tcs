import React, { ReactNode } from "react";
import { Container, Grid } from "@mui/material";
import { TitleForms } from "components/FormGroup";

interface ContainerFormsProps {
  children: ReactNode;
  sizeForm: string;
  titleForm: string;
}

const ContainerCompany: React.FC<ContainerFormsProps> = ({
  children,
  sizeForm,
  titleForm,
}) => {
  return (
    <Grid
      item
      sx={{
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
          border: "1px solid #E5E5E5",
        }}
      >
        <TitleForms>
          <h1>{titleForm}</h1>
        </TitleForms>
        {children}
      </Container>
    </Grid>
  );
};

export { ContainerCompany };
