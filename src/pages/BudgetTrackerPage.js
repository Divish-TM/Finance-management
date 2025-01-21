import React from "react";
import { Box, Typography } from "@mui/material";
import BudgetTracker from "../components/BudgetTracker";

const BudgetTrackerPage = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Budget Tracker
            </Typography>
            <BudgetTracker />
        </Box>
    );
};

export default BudgetTrackerPage;
