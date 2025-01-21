import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";

const drawerWidth = 240; // Adjust sidebar width here

const MainLayout = ({ children }) => {
    return (
        <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            {/* Navbar */}
            <Box sx={{ width: "100%", position: "fixed", zIndex: 1201 }}>
                <Navbar />
            </Box>

            {/* Sidebar */}
            <Box
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    position: "fixed",
                    height: "100%",
                    top: 64, // Navbar height (adjust if needed)
                    zIndex: 1200,
                    backgroundColor: "#f4f4f4",
                    borderRight: "1px solid #ddd",
                }}
            >
                <Sidebar />
            </Box>

            {/* Main Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    marginLeft: `${drawerWidth}px`,
                    marginTop: "64px", // Navbar height (adjust if needed)
                    overflow: "auto",
                    padding: 3,
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default MainLayout;
