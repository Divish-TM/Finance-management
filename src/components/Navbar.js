import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <AppBar position="sticky" sx={{ zIndex: 1201 }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Finance Dashboard
                </Typography>
                <Button color="inherit" component={NavLink} to="/" sx={{ textTransform: "none" }}>
                    Home
                </Button>
                <Button color="inherit" component={NavLink} to="/transactions" sx={{ textTransform: "none" }}>
                    Transactions
                </Button>
                <Button color="inherit" component={NavLink} to="/analytics" sx={{ textTransform: "none" }}>
                    Analytics
                </Button>
                <Button color="inherit" component={NavLink} to="/budget-tracker" sx={{ textTransform: "none" }}>
                    Budget
                </Button>
                <Button color="inherit" component={NavLink} to="/settings" sx={{ textTransform: "none" }}>
                    Settings
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
