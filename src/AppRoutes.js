import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import TransactionsPage from "./pages/TransactionsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import { getTheme } from "./styles/theme"; // Dynamic theme function
import BudgetTrackerPage from "./pages/BudgetTrackerPage";

const AppRoutes = ({ toggleTheme, currentTheme }) => {
    return (
        <ThemeProvider theme={getTheme(currentTheme)}>
            <CssBaseline />
            <MainLayout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="/budget-tracker" element={<BudgetTrackerPage/>}/>
                    <Route
                        path="/settings"
                        element={
                            <SettingsPage toggleTheme={toggleTheme} currentTheme={currentTheme} />
                        }
                    />
                </Routes>
            </MainLayout>
        </ThemeProvider>
    );
};

export default AppRoutes;
