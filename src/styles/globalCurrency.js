export const getCurrencySymbol = (currency) => {
    const symbols = {
        USD: "$",
        EUR: "€",
        INR: "₹",
        JPY: "¥",
    };
    return symbols[currency] || currency;
};
