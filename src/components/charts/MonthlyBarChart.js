import React, { useContext } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from "recharts";
import { AppContext } from "../../context/AppContext";

const MonthlyBarChart = () => {
    const { transactions } = useContext(AppContext);

    // Define months
    const months = [
        "January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October", "November", "December"
    ];

    // Initialize arrays to hold income and expenses for each month
    const monthlyIncome = Array(12).fill(0);
    const monthlyExpenses = Array(12).fill(0);

    // Categorize transactions as income or expenditure and sum them for each month
    transactions.forEach((transaction) => {
        const month = new Date(transaction.date).getMonth(); // Get the month (0-11)
        const amount = parseFloat(transaction.amount);
        if (transaction.type === "income") {
            monthlyIncome[month] += amount; // Add to income if transaction type is income
        } else if (transaction.type === "expense") {
            monthlyExpenses[month] += amount; // Add to expenses if transaction type is expense
        }
    });

    // Prepare data for the chart
    const data = months.map((month, index) => ({
        month,
        income: monthlyIncome[index],
        expenses: monthlyExpenses[index],
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* Add bars for income and expenses */}
                <Bar dataKey="income" fill="#4CAF50" name="Income" />
                <Bar dataKey="expenses" fill="#F44336" name="Expenses" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default MonthlyBarChart;
