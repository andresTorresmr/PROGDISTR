import "./App.css";

import {
  AppBar,
  Button,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import MenuIcon from "@mui/icons-material/Menu";
import Inventory2TwoToneIcon from "@mui/icons-material/Inventory2TwoTone";
import SellTwoToneIcon from "@mui/icons-material/SellTwoTone";
import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
import { Box } from "@mui/system";
import NavListDrawer from "./Pages/NavBar/NavListDrawer";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const navLinks = [
  {
    title: "Productos",
    path: "productos",
    icon: <Inventory2TwoToneIcon />,
  },
  {
    title: "Marcas",
    path: "marcas",
    icon: <SellTwoToneIcon />,
  },
  {
    title: "Plataformas",
    path: "plataformas",
    icon: <StorefrontTwoToneIcon />,
  },
  {
    title: "Ventas",
    path: "ventas",
    icon: <StorefrontTwoToneIcon />,
  },
  {
    title: "Reportes",
    path: "reportes",
    icon: <StorefrontTwoToneIcon />,
  },
  {
    title: "Cerrar sesión",
    path: "logout",
    icon: <LogoutIcon />,
  },
];

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AppBar className="bg-slate-700">
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            sx={{ display: { xs: "flex", sm: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <img
            src="../src/assets/logo.png"
            alt="logo"
            className="h-8 w-8 mr-5"
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Herramientas Quiroz
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navLinks.map((link) => (
              <Button
                color="inherit"
                component={NavLink}
                to={link.path}
                key={link.title}
              >
                {link.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
        sx={{ display: { xs: "flex", sm: "none" } }}
      >
        <NavListDrawer links={navLinks} setOpen={setOpen} />
      </Drawer>
      <Box component="main" className="p-3">
        <Toolbar />

        <Outlet className="overflow-hidden bg-blue-500" />
      </Box>
    </>
  );
}

export default App;
