import React, { useState } from "react";
import logo from "assets/logo/logo.png";
import { logout } from "services/auth.service";
import CustomAppBar from "./Header/Header.component";
import CustomDrawer from "./SideBar/SideBar.compenent";

const NavBar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuItems = [
    { text: "Home", href: "/home", title: "Bem-vindo ao GastroCustos" },
    { text: "Empresa", href: "/company", title: "Empresa" },
    { text: "Revenda", href: "/resale-item", title: "Revenda" },
    { text: "Insumos", href: "/feed-stock", title: "Insumos" },
    { text: "Product", href: "/product", title: "Produtos" },
  ];
  const currentPath = new URL(window.location.href).pathname;
  const matchedItem = menuItems.find((item) => currentPath === item.href);
  const pageTitle = matchedItem?.title || "Página não encontrada";

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div style={{ marginBlockEnd: "2%" }}>
      <CustomAppBar
        pageTitle={pageTitle}
        handleDrawerOpen={handleDrawerOpen}
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
        handleLogout={handleLogout}
        anchorEl={anchorEl}
      />
      <CustomDrawer
        isDrawerOpen={isDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        menuItems={menuItems}
        logo={logo}
      />
    </div>
  );
};

export default NavBar;
