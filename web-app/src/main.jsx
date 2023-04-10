import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
import Products from "./Pages/Products/Products";
import Brands from "./Pages/Brands/Brands";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/productos",
        element: <Products />,
      },
      {
        path: "/marcas",
        element: <Brands />,
      },
      {
        path: "/ventas",
        element: <h1>ventas</h1>,
      },
    ],
  },
]);

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#334155",
    },
    secondary: {
      main: "#e8de17",
    },
    error: {
      main: "#e40000",
    },
    warning: {
      main: "#ed6c02",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <SnackbarProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </SnackbarProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  </Provider>
);
