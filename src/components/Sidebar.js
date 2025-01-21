import React from "react";
import { Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PieChartIcon from "@mui/icons-material/PieChart";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";
import { Savings } from "@mui/icons-material";

const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                "& .MuiDrawer-paper": {
                    width: 240,
                    boxSizing: "border-box",
                },
            }}
        >
            <Box sx={{ mt: 2, p: 1 }}>
                <Typography variant="h6" align="center">
                    Menu
                </Typography>
            </Box>
            <List>
                <ListItem button component={NavLink} to="/">
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={NavLink} to="/transactions">
                    <ListItemIcon>
                        <AccountBalanceWalletIcon />
                    </ListItemIcon>
                    <ListItemText primary="Transactions" />
                </ListItem>
                <ListItem button component={NavLink} to="/analytics">
                    <ListItemIcon>
                        <PieChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Analytics" />
                </ListItem>
                <ListItem button component={NavLink} to="/budget-tracker">
                    <ListItemIcon>
                        <Savings/>
                    </ListItemIcon>
                    <ListItemText primary="Budget" />
                </ListItem>
                <ListItem button component={NavLink} to="/settings">
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
