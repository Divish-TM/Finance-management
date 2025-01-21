import React, { useContext } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { AppContext } from "../../context/AppContext";

const IncomeVsExpensesChart = () => {
    const { transactions } = useContext(AppContext);

    // Get a unique list of transaction dates
    const uniqueDates = [
        ...new Set(transactions.map((transaction) => transaction.date)),
    ].sort();

    // Prepare the data with income and expenses per date
    const data = uniqueDates.map((date) => {
        const dailyIncome = transactions
            .filter((transaction) => transaction.date === date && transaction.type === "income")
            .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

        const dailyExpenses = transactions
            .filter((transaction) => transaction.date === date && transaction.type === "expense")
            .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

        return {
            date,
            income: dailyIncome,
            expenses: dailyExpenses,
        };
    });

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="income" stroke="#4CAF50" name="Income" />
                <Line type="monotone" dataKey="expenses" stroke="#F44336" name="Expenses" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default IncomeVsExpensesChart;
