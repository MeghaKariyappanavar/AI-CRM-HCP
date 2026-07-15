import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import "@fontsource/inter";

import App from "./App";
import { store } from "./redux/store";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#2563eb"
        },
        secondary: {
            main: "#0f766e"
        },
        background: {
            default: "#f4f7fb"
        }
    },
    shape: {
        borderRadius: 14
    },
    typography: {
        fontFamily: ["Inter", "Roboto", "Arial", "sans-serif"].join(",")
    }
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
