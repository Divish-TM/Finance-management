import React, { useState, useEffect, useContext, useCallback } from "react";
import {
    Box,
    Typography,
    LinearProgress,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
} from "@mui/material";
import { AppContext } from "../context/AppContext";
import { getCurrencySymbol } from "../styles/globalCurrency";

const BudgetTracker = () => {
    const { budgets, transactions, setBudget, settings } = useContext(AppContext);
    const [editCategory, setEditCategory] = useState(null);
    const [newBudget, setNewBudget] = useState("");
    const [alertedCategories, setAlertedCategories] = useState([]); // Track alerted categories
    const [lastTransactionCount, setLastTransactionCount] = useState(transactions.length); // Track previous transaction count

    const currencySymbol = getCurrencySymbol(settings.currency || "INR");

    // Function to calculate spending for a specific category
    const calculateSpendingForCategory = useCallback(
        (category) => {
            return transactions
                .filter((txn) => txn.type === "expense" && txn.category === category)
                .reduce((sum, txn) => sum + txn.amount, 0);
        },
        [transactions]
    );

    const handleEditBudget = (category) => {
        setEditCategory(category);
        setNewBudget(budgets[category] || "");
    };

    const handleSaveBudget = () => {
        if (newBudget <= 0) {
            alert("Budget must be greater than 0");
            return;
        }
        setBudget(editCategory, parseFloat(newBudget));
        setEditCategory(null);
        setNewBudget("");
        setAlertedCategories((prev) =>
            prev.filter((category) => category !== editCategory) // Reset alert for edited category
        );
    };

    // Only alert if a new transaction has been added
    useEffect(() => {
        if (transactions.length > lastTransactionCount) {
            const newTransaction = transactions[transactions.length - 1];

            // Check if the new transaction is an expense
            if (newTransaction.type === "expense") {
                const category = newTransaction.category;
                const spending = calculateSpendingForCategory(category);

                if (spending > budgets[category] && !alertedCategories.includes(category)) {
                    alert(
                        `Alert: Spending for ${category} exceeds the budget of ${currencySymbol}${budgets[category]}!`
                    );
                    setAlertedCategories((prev) => [...prev, category]); // Mark category as alerted
                }
            }

            // Update the last transaction count
            setLastTransactionCount(transactions.length);
        }
    }, [transactions, budgets, alertedCategories, currencySymbol, calculateSpendingForCategory, lastTransactionCount]);

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Budget Tracker
            </Typography>
            {Object.keys(budgets).map((category) => {
                const spending = calculateSpendingForCategory(category);
                const percentage = (spending / budgets[category]) * 100;

                return (
                    <Box key={category} sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">
                            {category}: {currencySymbol}
                            {spending.toFixed(2)} / {currencySymbol}
                            {budgets[category].toFixed(2)}
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={percentage > 100 ? 100 : percentage}
                            sx={{
                                height: 8,
                                backgroundColor: "#E0E0E0",
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor: percentage > 100 ? "#F44336" : "#4CAF50",
                                },
                            }}
                        />
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleEditBudget(category)}
                            sx={{ mt: 1 }}
                        >
                            Edit Budget
                        </Button>
                    </Box>
                );
            })}

            {/* Edit Budget Dialog */}
            {editCategory && (
                <Dialog open={!!editCategory} onClose={() => setEditCategory(null)}>
                    <DialogTitle>Edit Budget</DialogTitle>
                    <DialogContent>
                        <Typography variant="subtitle1" gutterBottom>
                            Category: {editCategory}
                        </Typography>
                        <TextField
                            fullWidth
                            label="New Budget"
                            type="number"
                            value={newBudget}
                            onChange={(e) => setNewBudget(e.target.value)}
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditCategory(null)}>Cancel</Button>
                        <Button onClick={handleSaveBudget} variant="contained">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default BudgetTracker;
