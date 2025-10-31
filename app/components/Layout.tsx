import React, { ReactNode } from "react";
import { AppBar, Toolbar, Typography, Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";

const drawerWidth = 240;

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { name: "Inicio", path: "/" },
  { name: "Clientes", path: "/clientes" },
  { name: "Pedidos", path: "/pedidos" },
  { name: "Proveedores", path: "/proveedores" },
  { name: "Facturas", path: "/facturas" },
];

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            MultiPedidos Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
            {navItems.map((item) => (
                <ListItemButton
                key={item.name}
                component={Link}
                href={item.path}
                >
                <ListItemText primary={item.name} />
                </ListItemButton>
            ))}
        </List>
      </Drawer>

      <main style={{ flexGrow: 1, padding: '80px 24px 24px 24px' }}>
        {children}
      </main>
    </div>
  );
}