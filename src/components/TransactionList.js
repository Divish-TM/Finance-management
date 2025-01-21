import React, { useContext, useState } from "react";
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    MenuItem,
    DialogActions,
    Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { AppContext } from "../context/AppContext";
import { getCurrencySymbol } from "../styles/globalCurrency";

const TransactionList = () => {
    const {
        transactions = [],
        deleteTransaction,
        editTransaction,
        categories,
        settings,
    } = useContext(AppContext);

    const currencySymbol = getCurrencySymbol(settings.currency || "INR");
    const incomeTransactions = transactions.filter((txn) => txn.type === "income");
    const expenseTransactions = transactions.filter((txn) => txn.type === "expense");

    const [editData, setEditData] = useState(null);

    const handleEdit = (transaction) => {
        setEditData(transaction); // Open the dialog with the transaction data
    };

    const handleSaveEdit = () => {
        editTransaction(editData); // Save the edited transaction
        setEditData(null); // Close the dialog
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            deleteTransaction(id); // Delete the transaction
        }
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Transaction List
            </Typography>

            <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
                {/* Income Transactions */}
                <Box flex={1} minWidth="300px">
                    <Typography variant="h6" color="green" gutterBottom>
                        Income
                    </Typography>
                    {incomeTransactions.length === 0 ? (
                        <Typography variant="body1">No income transactions available.</Typography>
                    ) : (
                        <List>
                            {incomeTransactions.map((transaction) => (
                                <ListItem
                                    key={transaction.id}
                                    sx={{
                                        borderLeft: `5px solid green`,
                                        mb: 1,
                                        borderRadius: 1,
                                    }}
                                    secondaryAction={
                                        <>
                                            <IconButton
                                                edge="end"
                                                aria-label="edit"
                                                onClick={() => handleEdit(transaction)}
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => handleDelete(transaction.id)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </>
                                    }
                                >
                                    <ListItemText
                                        primary={`${transaction.title} - ${currencySymbol}${transaction.amount}`}
                                        secondary={`${transaction.date}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>

                {/* Expense Transactions */}
                <Box flex={1} minWidth="300px">
                    <Typography variant="h6" color="red" gutterBottom>
                        Expenses
                    </Typography>
                    {expenseTransactions.length === 0 ? (
                        <Typography variant="body1">No expense transactions available.</Typography>
                    ) : (
                        <List>
                            {expenseTransactions.map((transaction) => (
                                <ListItem
                                    key={transaction.id}
                                    sx={{
                                        borderLeft: `5px solid red`,
                                        mb: 1,
                                        borderRadius: 1,
                                    }}
                                    secondaryAction={
                                        <>
                                            <IconButton
                                                edge="end"
                                                aria-label="edit"
                                                onClick={() => handleEdit(transaction)}
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => handleDelete(transaction.id)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </>
                                    }
                                >
                                    <ListItemText
                                        primary={`${transaction.title} - ${currencySymbol}${transaction.amount}`}
                                        secondary={`${transaction.date}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            </Box>

            {/* Edit Transaction Dialog */}
            {editData && (
                <Dialog open={!!editData} onClose={() => setEditData(null)}>
                    <DialogTitle>Edit Transaction</DialogTitle>
                    <DialogContent>
                        <TextField
                            select
                            fullWidth
                            label="Type"
                            name="type"
                            value={editData.type}
                            onChange={(e) =>
                                setEditData({ ...editData, type: e.target.value })
                            }
                            margin="dense"
                        >
                            <MenuItem value="income">Income</MenuItem>
                            <MenuItem value="expense">Expense</MenuItem>
                        </TextField>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={editData.title}
                            onChange={(e) =>
                                setEditData({ ...editData, title: e.target.value })
                            }
                            margin="dense"
                        />
                        <TextField
                            fullWidth
                            label="Amount"
                            name="amount"
                            type="number"
                            value={editData.amount}
                            onChange={(e) =>
                                setEditData({
                                    ...editData,
                                    amount: Number(e.target.value),
                                })
                            }
                            margin="dense"
                        />
                        <TextField
                            select
                            fullWidth
                            label="Category"
                            name="category"
                            value={editData.category}
                            onChange={(e) =>
                                setEditData({ ...editData, category: e.target.value })
                            }
                            margin="dense"
                            disabled={editData.type === "income"} // Disable if type is income
                        >
                            {categories.map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            label="Date"
                            name="date"
                            type="date"
                            value={editData.date}
                            onChange={(e) =>
                                setEditData({ ...editData, date: e.target.value })
                            }
                            InputLabelProps={{ shrink: true }}
                            margin="dense"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditData(null)}>Cancel</Button>
                        <Button onClick={handleSaveEdit} variant="contained">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default TransactionList;
