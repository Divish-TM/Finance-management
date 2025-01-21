import React, { useContext } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { AppContext } from "../../context/AppContext";
import { chartColors } from "../../styles/constants";

const ExpenseDistributionChart = () => {
    const { transactions } = useContext(AppContext);

    // Filter transactions where type is not 'income'
    const expenseTransactions = transactions.filter((t) => t.type !== "income");

    // Dynamically generate categories from expense transactions
    const categories = [
        ...new Set(expenseTransactions.map((t) => t.category)),
    ];

    // Calculate category-wise expense data
    const categoryData = categories.map((cat) => ({
        name: cat,
        value: expenseTransactions
            .filter((t) => t.category === cat)
            .reduce((sum, t) => sum + parseFloat(t.amount), 0),
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    {categoryData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={
                                chartColors[entry.name] ||
                                `#${Math.floor(Math.random() * 16777215).toString(16)}`
                            }
                        />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default ExpenseDistributionChart;
