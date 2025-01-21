import React from "react";
import { Box, Typography } from "@mui/material";
import ExpenseForm from "../components/ExpenseForm";
import TransactionList from "../components/TransactionList";

const TransactionsPage = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Transactions
            </Typography>
            <ExpenseForm />
            <Box sx={{ p: 10 }}>
            <TransactionList />
            </Box>
        </Box>
    );
};

export default TransactionsPage;
