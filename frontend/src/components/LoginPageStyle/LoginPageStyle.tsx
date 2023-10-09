import { Grid } from "@mui/material"
import React from "react"
import gastrocustos from "../../assets/gastrocustos.png"

interface LoginPageStyleProps {
    children: React.ReactNode
}

const LoginPageStyle = (props: LoginPageStyleProps) => {
    const { children } = props;

    return (
        <Grid container spacing={2}
            sx={{
                display: 'flex',
                flexDirection: 'row'
            }}
        >
            <Grid item xs={6}>
                <img src={gastrocustos} style={{ width: '100%', height: '100%' }} alt="Logo" />
            </Grid>
            <Grid item xs={6}>
                {children}
            </Grid>
        </Grid>
    )
}

export default LoginPageStyle;