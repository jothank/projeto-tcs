import { createTheme } from "@mui/material";
import { blue, yellow } from "@mui/material/colors";

export const Theme = createTheme({
    palette: {
        primary: {
            main: blue[700] ,
            dark: blue[800] ,
            light: blue[500] ,
            contrastText: '#fff' ,
        },

        secondary: {
            main: yellow[700] ,
            dark: yellow[800] ,
            light: yellow[500] ,
            contrastText: '#fff' ,
        },
        background: {
            default: "f7f6f3" ,
            paper: "#ffff" ,
        }
    }
});