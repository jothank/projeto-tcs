import { Grid } from '@mui/material';
import React, { ReactNode } from "react";

interface ButtonContainerProps {
  children: ReactNode;
 
}

export const ButtonContainer: React.FC<ButtonContainerProps> = ({ children }) => {
  return (
    <Grid
      sx={{
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'end',
        gap: '20px'
      }}
    >
      {children}
    </Grid>
  );
};
