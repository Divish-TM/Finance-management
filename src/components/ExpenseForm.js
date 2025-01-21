import React, { useState, useContext } from "react";
import { Box, Button, TextField, MenuItem, Grid } from "@mui/material";
import { AppContext } from "../context/AppContext";

const ExpenseForm = () => {
    const { addTransaction, categories, budgets, transactions } = useContext(AppContext);
    const [formData, setFormData] = useState({
        type: "expense", // Default type
        title: "",
        amount: "",
        category: "",
        date: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false); // Prevent duplicate submissions

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const calculateCurrentSpending = (category) => {
        return transactions
            .filter((txn) => txn.type === "expense" && txn.category === category)
            .reduce((total, txn) => total + txn.amount, 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prevent multiple submissions
        if (isSubmitting) return;

        setIsSubmitting(true);

        // Validation checks
        if (!formData.title || !formData.amount || !formData.date) {
            alert("Please fill in all required fields.");
            setIsSubmitting(false);
            return;
        }

        if (formData.type === "expense" && !formData.category) {
            alert("Please select a category for expenses.");
            setIsSubmitting(false);
            return;
        }

        if (parseFloat(formData.amount) <= 0) {
            alert("Amount must be greater than zero.");
            setIsSubmitting(false);
            return;
        }

        if (formData.type === "expense") {
            const spending = calculateCurrentSpending(formData.category);
            const budget = budgets[formData.category] || 0;
            const totalSpending = spending + parseFloat(formData.amount);

            if (totalSpending > budget) {
                alert(
                    `Warning: This transaction exceeds the budget for ${formData.category}. Budget: ${budget}, Spending: ${totalSpending}.`
                );
            }
        }

        // Add the transaction
        const newTransaction = {
            ...formData,
            amount: parseFloat(formData.amount), // Ensure the amount is a number
            date: new Date(formData.date).toISOString(), // Ensure the date is properly formatted
        };
        addTransaction(newTransaction);

        // Clear form fields after submission
        setFormData({ type: "expense", title: "", amount: "", category: "", date: "" });
        setIsSubmitting(false);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        select
                        fullWidth
                        label="Type"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                    >
                        <MenuItem value="income">Income</MenuItem>
                        <MenuItem value="expense">Expense</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Amount"
                        name="amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        select
                        fullWidth
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required={formData.type === "expense"} // Required only for expense type
                        disabled={formData.type === "income"} // Disable if type is income
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        disabled={isSubmitting} // Disable button while submitting
                    >
                        {isSubmitting ? "Submitting..." : "Add Transaction"}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ExpenseForm;
