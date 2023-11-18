import React, { useState } from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Link,
  Divider,
  Collapse,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './Sidebar.module.css';
import Logosemfundo from '../../../assets/Logo sem fundo.png';

interface SubItem {
  text: string;
  href: string;
}

interface MenuItem {
  text: string;
  href: string;
  title?: string;
  subItems?: SubItem[];
}

interface DrawerProps {
  isDrawerOpen: boolean;
  handleDrawerClose: () => void;
  menuItems: MenuItem[];
  logo: string;
}

const CustomDrawer: React.FC<DrawerProps> = ({
  isDrawerOpen,
  handleDrawerClose,
  menuItems,
  logo,
}) => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const handleSubMenuClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, itemText: string) => {
    event.preventDefault();
    setOpenSubMenu(openSubMenu === itemText ? null : itemText);
  };

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={handleDrawerClose}
      PaperProps={{ className: styles.theme }}
    >
      <div
        style={{
          width: '250px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={handleDrawerClose} className={styles.text}>
          <MenuIcon />
        </IconButton>
        <div style={{ marginBottom: '16px' }}>
          <img src={Logosemfundo} alt="Logo" width="100%" />
        </div>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem 
              button 
              component={item.subItems ? "div" : Link} 
              href={item.subItems ? undefined : item.href} 
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => item.subItems ? handleSubMenuClick(e, item.text) : undefined}
            >
              <ListItemText primary={item.text} className={styles.text} />
            </ListItem>
            {item.subItems && (
              <Collapse in={openSubMenu === item.text} timeout="auto" unmountOnExit>
                {item.subItems.map((subItem, subIndex) => (
                  <List component="div" disablePadding key={subIndex}>
                    <ListItem button className={styles.text} component={Link} href={subItem.href}>
                      <ListItemText primary={subItem.text} />
                    </ListItem>
                  </List>
                ))}
              </Collapse>
            )}
            <Divider className={styles.text_dividr} />
          </React.Fragment>
        ))}
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
