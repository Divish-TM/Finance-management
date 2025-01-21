import React, { createContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid"; // Import uuid for unique IDs

// Initial State
const initialState = {
    income: JSON.parse(localStorage.getItem("income")) || 5000,
    transactions: JSON.parse(localStorage.getItem("transactions")) || [],
    categories: JSON.parse(localStorage.getItem("categories")) || [
        "Food",
        "Rent",
        "Travel",
        "Entertainment",
        "Other",
    ],
    budgets: JSON.parse(localStorage.getItem("budgets")) || {
        Food: 500,
        Rent: 1500,
        Travel: 300,
        Entertainment: 200,
        Other: 100,
    },
    settings: {
        theme: localStorage.getItem("themeMode") || "light",
        currency: localStorage.getItem("currency") || "INR",
    },
};


// Create Context
const AppContext = createContext(initialState);

// Reducer Function
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TRANSACTION":
            const updatedTransactions = [...state.transactions, action.payload];
            localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
            return { ...state, transactions: updatedTransactions };

        case "EDIT_TRANSACTION":
            const editedTransactions = state.transactions.map((txn) =>
                txn.id === action.payload.id ? action.payload : txn
            );
            localStorage.setItem("transactions", JSON.stringify(editedTransactions));
            return { ...state, transactions: editedTransactions };

        case "DELETE_TRANSACTION":
            const filteredTransactions = state.transactions.filter(
                (txn) => txn.id !== action.payload
            );
            localStorage.setItem("transactions", JSON.stringify(filteredTransactions));
            return { ...state, transactions: filteredTransactions };

        case "SET_BUDGET":
            const updatedBudgets = {
                ...state.budgets,
                [action.payload.category]: action.payload.amount,
            };
            localStorage.setItem("budgets", JSON.stringify(updatedBudgets));
            return { ...state, budgets: updatedBudgets };

        case "SET_INCOME":
            localStorage.setItem("income", JSON.stringify(action.payload));
            return { ...state, income: action.payload };

        case "ADD_CATEGORY":
            const updatedCategories = [...state.categories, action.payload];
            localStorage.setItem("categories", JSON.stringify(updatedCategories));
            return { ...state, categories: updatedCategories };

        case "EDIT_CATEGORY":
            const renamedCategories = state.categories.map((category) =>
                category === action.payload.oldName ? action.payload.newName : category
            );
            localStorage.setItem("categories", JSON.stringify(renamedCategories));
            return { ...state, categories: renamedCategories };

        case "DELETE_CATEGORY":
            const reducedCategories = state.categories.filter(
                (category) => category !== action.payload
            );
            localStorage.setItem("categories", JSON.stringify(reducedCategories));
            return { ...state, categories: reducedCategories };

        case "SET_SETTING":
            const updatedSettings = {
                ...state.settings,
                [action.payload.key]: action.payload.value,
            };
            localStorage.setItem(action.payload.key, action.payload.value);
            return { ...state, settings: updatedSettings };

        case "LOAD_STATE":
            return { ...state, ...action.payload };

        default:
            return state;
    }
};


// Context Provider Component
export const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Load state from localStorage when the app starts

    useEffect(() => {
        try {
            const savedState = localStorage.getItem("appState");
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                if (parsedState) {
                    dispatch({ type: "LOAD_STATE", payload: parsedState });
                }
            }
        } catch (error) {
            console.error("Failed to load state from localStorage:", error);
        }
    }, []);
    

    // Save state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("appState", JSON.stringify(state));
    }, [state]);

    // Actions
    const addTransaction = (transaction) => {
        const newTransaction = { ...transaction, id: uuidv4() }; // Assign unique ID
        dispatch({ type: "ADD_TRANSACTION", payload: newTransaction });
        toast.success(`Transaction "${newTransaction.title}" added successfully!`, {
            position: "top-right",
            autoClose: 600,
        });
    };

    const editTransaction = (updatedTransaction) => {
        const exists = state.transactions.find((txn) => txn.id === updatedTransaction.id);
        if (!exists) {
            toast.error("Transaction not found!", { position: "top-right" });
            return;
        }
        dispatch({ type: "EDIT_TRANSACTION", payload: updatedTransaction });
        toast.info(`Transaction "${updatedTransaction.title}" updated successfully!`, {
            position: "top-right",
        });
    };

    const deleteTransaction = (id) => {
        if (!id) {
            console.error("Error: Missing transaction ID for deletion");
            return;
        }
        dispatch({ type: "DELETE_TRANSACTION", payload: id });
        toast.error("Transaction deleted!", { position: "top-right" });
    };

    const setBudget = (category, amount) => {
        if (isNaN(amount) || amount <= 0) {
            toast.error("Please enter a valid budget amount!", { position: "top-right" });
            return;
        }
        dispatch({ type: "SET_BUDGET", payload: { category, amount } });
        toast.success(`Budget for "${category}" updated to ${amount}!`, {
            position: "top-right",
        });
    };

    const setIncome = (income) => {
        dispatch({ type: "SET_INCOME", payload: income });
        toast.success(`Income updated to ${income}!`, { position: "top-right" });
    };

    const addCategory = (category) => {
        if (state.categories.includes(category)) {
            toast.warn(`Category "${category}" already exists!`, { position: "top-right" });
            return;
        }
        dispatch({ type: "ADD_CATEGORY", payload: category });
        toast.success(`Category "${category}" added successfully!`, { position: "top-right" });
    };

    const editCategory = (oldName, newName) => {
        dispatch({
            type: "EDIT_CATEGORY",
            payload: { oldName, newName },
        });
        toast.info(`Category "${oldName}" updated to "${newName}"!`, { position: "top-right" });
    };

    const deleteCategory = (category) => {
        dispatch({ type: "DELETE_CATEGORY", payload: category });
        toast.error(`Category "${category}" deleted!`, { position: "top-right" });
    };

    const setSetting = (key, value) => {
        dispatch({ type: "SET_SETTING", payload: { key, value } });
        toast.success(`Setting "${key}" updated to "${value}"!`, { position: "top-right" });
    };

    const setCurrency = (newCurrency) => {
        dispatch({ type: "SET_SETTING", payload: { key: "currency", value: newCurrency } });
        toast.success(`Currency updated to ${newCurrency}!`, { position: "top-right" });
    };
    

    return (
        <AppContext.Provider
            value={{
                ...state,
                dispatch,
                addTransaction,
                editTransaction,
                deleteTransaction,
                setBudget,
                setIncome,
                addCategory,
                editCategory,
                deleteCategory,
                setSetting,
                setCurrency,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppContext };
