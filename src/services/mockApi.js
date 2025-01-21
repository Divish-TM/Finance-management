export const fetchTransactions = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    title: "Groceries",
                    amount: "50",
                    category: "Food",
                    date: "2025-01-01",
                },
                {
                    title: "Rent",
                    amount: "1200",
                    category: "Rent",
                    date: "2025-01-01",
                },
            ]);
        }, 1000);
    });
};
