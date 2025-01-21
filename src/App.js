import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import AppRoutes from "./AppRoutes";
import { getTheme } from "./styles/theme";
import GlobalStyles from "./styles/globalStyles";
import { AppContextProvider } from "./context/AppContext";
import { ToastContainer } from "react-toastify";

const App = () => {
    // Retrieve initial states from localStorage
    const [themeMode, setThemeMode] = useState(localStorage.getItem("themeMode") || "light");
    const [currency, setCurrency] = useState(localStorage.getItem("currency") || "USD");

    // Save theme and currency to localStorage when they change
    useEffect(() => {
        localStorage.setItem("themeMode", themeMode);
        localStorage.setItem("currency", currency);
    }, [themeMode, currency]);

    // Function to toggle the theme mode
    const toggleTheme = () => {
        setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };

    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <GlobalStyles theme={getTheme(themeMode).palette} />
            <AppContextProvider>
                <ToastContainer />
                <CssBaseline />
                <Router>
                    <AppRoutes toggleTheme={toggleTheme} currentTheme={themeMode} />
                </Router>
            </AppContextProvider>
        </ThemeProvider>
    );
};

export default App;
