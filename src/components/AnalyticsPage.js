import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import ExpenseDistributionChart from "../components/charts/ExpenseDistributionChart";
import IncomeVsExpensesChart from "../components/charts/IncomeVsExpensesChart";
import MonthlyBarChart from "../components/charts/MonthlyBarChart";

const AnalyticsPage = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Analytics
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6">Expense Distribution</Typography>
                        <ExpenseDistributionChart />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6">Income vs Expenses</Typography>
                        <IncomeVsExpensesChart />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6">Monthly Expenses</Typography>
                        <MonthlyBarChart />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AnalyticsPage;
