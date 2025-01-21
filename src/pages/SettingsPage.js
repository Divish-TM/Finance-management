import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import {
    Box,
    Typography,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    IconButton,
    MenuItem,
    Switch,
    Divider,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const SettingsPage = ({ toggleTheme, currentTheme }) => {
    const { categories = [], settings, setSetting, dispatch } = useContext(AppContext); // Access categories and settings directly
    const [newCategory, setNewCategory] = useState("");
    const [editCategory, setEditCategory] = useState(null);
    const [editedCategoryName, setEditedCategoryName] = useState("");
    const [defaultCurrency, setDefaultCurrency] = useState(settings.currency || "INR"); // Default to "INR" if not set

    const currencies = ["USD", "EUR", "INR", "JPY"]; // Supported currencies

    // Sync currency from settings to state when settings update
    useEffect(() => {
        setDefaultCurrency(settings.currency || "INR");
    }, [settings.currency]);

    // Handle Add Category
    const handleAddCategory = () => {
        if (newCategory.trim()) {
            dispatch({ type: "ADD_CATEGORY", payload: newCategory });
            setNewCategory("");
        }
    };

    // Handle Edit Category
    const handleEditCategory = () => {
        if (editCategory && editedCategoryName.trim()) {
            dispatch({
                type: "EDIT_CATEGORY",
                payload: { oldName: editCategory, newName: editedCategoryName },
            });
            setEditCategory(null);
            setEditedCategoryName("");
        }
    };

    // Handle Delete Category
    const handleDeleteCategory = (category) => {
        dispatch({ type: "DELETE_CATEGORY", payload: category });
    };

    // Handle Currency Change
    const handleCurrencyChange = (event) => {
        const currency = event.target.value;
        setDefaultCurrency(currency);
        setSetting("currency", currency); // Update in the context
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Theme Switching */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6">Theme</Typography>
                <Switch
                    checked={currentTheme === "dark"}
                    onChange={toggleTheme}
                    name="themeSwitch"
                />
                <Typography variant="body1">
                    Current Theme: {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}
                </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Category Management */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6">Categories</Typography>
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <TextField
                        label="Add Category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleAddCategory}>
                        Add
                    </Button>
                </Box>

                {/* List of Categories */}
                <List sx={{ mt: 2 }}>
                    {categories.map((category) => (
                        <ListItem
                            key={category}
                            secondaryAction={
                                <>
                                    <IconButton
                                        edge="end"
                                        onClick={() => {
                                            setEditCategory(category);
                                            setEditedCategoryName(category);
                                        }}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        color="error"
                                        onClick={() => handleDeleteCategory(category)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemText primary={category} />
                        </ListItem>
                    ))}
                </List>

                {/* Edit Category Input */}
                {editCategory && (
                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                        <TextField
                            label="Edit Category"
                            value={editedCategoryName}
                            onChange={(e) => setEditedCategoryName(e.target.value)}
                        />
                        <Button variant="contained" onClick={handleEditCategory}>
                            Save
                        </Button>
                    </Box>
                )}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Default Currency */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6">Default Currency</Typography>
                <TextField
                    select
                    fullWidth
                    label="Choose Currency"
                    value={defaultCurrency}
                    onChange={handleCurrencyChange}
                    sx={{ mt: 2 }}
                >
                    {currencies.map((currency) => (
                        <MenuItem key={currency} value={currency}>
                            {currency}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
        </Box>
    );
};

export default SettingsPage;
