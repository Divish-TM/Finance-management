import React, { useContext } from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import ExpenseDistributionChart from "./charts/ExpenseDistributionChart";
import { AppContext } from "../context/AppContext";
import IncomeVsExpensesChart from "./charts/IncomeVsExpensesChart";
import { getCurrencySymbol } from "../styles/globalCurrency";

const DashboardOverview = () => {
    const { transactions = [], settings = {} } = useContext(AppContext);
    const currencySymbol = getCurrencySymbol(settings.currency || "INR");

    // Calculate total income, expenses, and savings
    const totalIncome = transactions
        .filter((txn) => txn.type === "income")
        .reduce((sum, txn) => sum + txn.amount, 0);

    const totalExpense = transactions
        .filter((txn) => txn.type === "expense")
        .reduce((sum, txn) => sum + txn.amount, 0);

    const savings = totalIncome - totalExpense;

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Dashboard Overview
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                        <Typography variant="h6">Total Income</Typography>
                        <Typography variant="h5" color="green">
                            {currencySymbol}{totalIncome.toFixed(2)}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                        <Typography variant="h6">Total Expenses</Typography>
                        <Typography variant="h5" color="red">
                            {currencySymbol}{totalExpense.toFixed(2)}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                        <Typography variant="h6">Savings</Typography>
                        <Typography
                            variant="h5"
                            color={savings >= 0 ? "green" : "red"}
                        >
                            {currencySymbol}{savings.toFixed(2) > 0 ? savings.toFixed(2) : 0}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Box mt={4}>
                <Typography variant="h5" gutterBottom>
                    Expense Distribution
                </Typography>
                <ExpenseDistributionChart />
            </Box>
            <Box mt={4}>
                <Typography variant="h5" gutterBottom>
                    Income Vs Expenditure
                </Typography>
                <IncomeVsExpensesChart />
            </Box>
        </Box>
    );
};

export default DashboardOverview;
