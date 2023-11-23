import React from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import styles from "./Header.module.css";

interface AppBarProps {
  pageTitle: string;
  handleDrawerOpen: () => void;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
  handleLogout: () => void;
  handleEditProfile: () => void;
  anchorEl: null | HTMLElement;
}

const CustomAppBar: React.FC<AppBarProps> = ({
  pageTitle,
  handleDrawerOpen,
  handleMenuOpen,
  handleMenuClose,
  handleLogout,
  handleEditProfile,
  anchorEl,
}) => (
  <AppBar position="sticky" className={styles.theme}>
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        sx={{ color: "black" }}
        onClick={handleDrawerOpen}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" className={styles.title}>
        {pageTitle}
      </Typography>
      <IconButton
        sx={{ color: "black" }}
        color="inherit"
        onClick={handleMenuOpen}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditProfile}>Editar Perfil</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Toolbar>
  </AppBar>
);

export default CustomAppBar;
