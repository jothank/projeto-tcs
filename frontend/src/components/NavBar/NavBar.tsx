import React, { useState } from "react";
import logo from "assets/logo/logo.png";
import CustomAppBar from "./Header/Header.component";
import CustomDrawer from "./SideBar/SideBar.compenent";
import { getLogout } from "utils/ModalAlert";

const NavBar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuItems = [
    { text: "Home", href: "/home", title: "Bem-vindo ao GastroCustos" },
    // { text: "Empresa", href: "/company", title: "Empresa" },
    { text: "Insumos", href: "/feed-stock", title: "Insumos" },
    { text: "Produto", href: "/product", title: "Produtos" },
    { text: "Combo", href: "/combo", title: "Combos" },
    { text: "Gastos Fixos", href: "/fixed-expense", title: "Gastos Fixos" },
    { text: "Simulador de Precificação", href: "/pricing", title: "Simulador de precificação" },
    { text: "Ficha técnica", href: "/datasheet", title: "Ficha técnica" },
    
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
    getLogout("Deseja realmente sair?");
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
