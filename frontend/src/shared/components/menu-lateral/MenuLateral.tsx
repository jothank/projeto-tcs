import { Divider, Drawer, Icon , List, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme, useMediaQuery  } from "@mui/material"
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useDraweContext } from "shared/context";

interface MenuLateralProps {
    children: React.ReactNode;
  }

interface IListItemLinkProps {
    to: string;
    icon?: string;
    label: string;
    onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ( {to, icon, label, onClick} ) => {
    const navigate = useNavigate()
    const handleClick = () => {
        onClick?.();
        navigate(to);
    };
    return (
    
    <ListItemButton onClick={handleClick} >
    <ListItemText primary= {label} />
    </ListItemButton>
  

    )
}

export const MenuLateral: React.FC<MenuLateralProps> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    const {isDrawerOpen, toggleDrawerOpen, drawerOptions} = useDraweContext();
    return (
        <>
        <Drawer  open={isDrawerOpen} variant={smDown ? 'temporary' : "permanent"} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>
        <Box  height={theme.spacing(20)} 
        display='flex'
        alignItems='center'
        justifyContent='center'
        >
            <Typography>
                Gastro Custos
            </Typography>
        </Box>
        <Divider />
        <Box flex={1}>
            <List component='nav'>
                {drawerOptions.map(drawerOption =>(
            <ListItemLink 
                key={drawerOption.path}
                label={drawerOption.label}
                to= {drawerOption.path}
                onClick={smDown ? toggleDrawerOpen : undefined}
            />
            ))}
            </List>
        </Box>
        </Box>
        </Drawer>
        <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
        </Box>
       
        </>
    )
}