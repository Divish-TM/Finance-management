import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const useBudgetTracking = () => {
    const { transactions, budgets } = useContext(AppContext);

    const spendingByCategory = Object.keys(budgets).reduce((acc, category) => {
        acc[category] = transactions
            .filter((transaction) => transaction.category === category)
            .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
        return acc;
    }, {});

    return { spendingByCategory, budgets };
};

export default useBudgetTracking;
