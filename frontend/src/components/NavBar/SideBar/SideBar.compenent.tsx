import React from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Link,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./Sidebar.module.css";

interface DrawerProps {
  isDrawerOpen: boolean;
  handleDrawerClose: () => void;
  menuItems: { text: string; href: string }[];
  logo: string;
}

const CustomDrawer: React.FC<DrawerProps> = ({
  isDrawerOpen,
  handleDrawerClose,
  menuItems,
  logo,
}) => (
  <Drawer
    open={isDrawerOpen}
    onClose={handleDrawerClose}
    PaperProps={{ className: styles.theme }}
  >
    <div
      style={{
        width: "250px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <IconButton onClick={handleDrawerClose} className={styles.text}>
        <MenuIcon />
      </IconButton>
      <div style={{ marginBottom: "16px" }}>
        <img src={logo} alt="Logo" width="100" />
      </div>
      {menuItems.map((item, index) => (
        <List style={{ width: "100%" }} key={index}>
          <ListItem button component={Link} href={item.href}>
            <ListItemText primary={item.text} className={styles.text} />
          </ListItem>
          <Divider className={styles.text_divider} />
        </List>
      ))}
    </div>
  </Drawer>
);

export default CustomDrawer;
