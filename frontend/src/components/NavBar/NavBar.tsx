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
    { text: "Insumos", href: "/feed-stock", title: "Insumos" },
    { text: "Produto", href: "/product", title: "Produtos" },
    { text: "Combo", href: "/combo", title: "Combos" },
    {
      text: "Gastos Fixos",
      href: "/fixed-expense",
      title: "Gastos Fixos",
      subItems: [
        {
          text: "Cadastrar Gastos Fixos",
          href: "/fixed-expense/add",
          title: "Cadastrar Gastos Fixos",
        },
        {
          text: "Visualizar Gastos Fixos",
          href: "/fixed-expense/view",
          title: "Visualizar Gastos Fixos",
        },
      ],
    },
    {
      text: "Simulador de Precificação",
      href: "/pricing",
      title: "Simulador de Precificação",
      subItems: [
        {
          text: "Simulador de Preço",
          href: "/pricing/simulator",
          title: "Simulador de Preço"
        },
        {
          text: "Histórico de Precificação",
          href: "/pricing/history",
          title: "Histórico de Precificação"
        }
      ]
    },
    { text: "Simulador de Produção", href: "/production-simulator", title: "Simulador de produção" },
    { text: "Ficha Técnica", href: "/datasheet", title: "Ficha técnica" },
   
  ];

  const currentPath = new URL(window.location.href).pathname;
  const findMenuItem = (items: any[], path: string) =>
    items
      .flatMap((item: { subItems: any }) => [item, ...(item.subItems || [])])
      .find((item: { href: any }) => item.href === path);
  const matchedItem = findMenuItem(menuItems, currentPath);
  let pageTitle = matchedItem?.title || "Página não encontrada";
  if (currentPath === "/user") {
    pageTitle = "Editar Perfil";
  }

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

  function handleEditProfile(): void {
    window.location.href = "/user";
  }

  return (
    <div style={{ marginBlockEnd: "2%" }}>
      <CustomAppBar
        pageTitle={pageTitle}
        handleDrawerOpen={handleDrawerOpen}
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
        handleLogout={handleLogout}
        anchorEl={anchorEl}
        handleEditProfile={handleEditProfile}
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
