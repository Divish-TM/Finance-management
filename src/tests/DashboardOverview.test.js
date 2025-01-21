import React from "react";
import { render, screen } from "@testing-library/react";
import { AppContext } from "../context/AppContext";
import DashboardOverview from "./DashboardOverview";
import { getCurrencySymbol } from "../styles/globalCurrency";

// Mock the child components
jest.mock("./charts/ExpenseDistributionChart", () => () => <div>Expense Distribution Chart</div>);
jest.mock("./charts/IncomeVsExpensesChart", () => () => <div>Income Vs Expenditure Chart</div>);

jest.mock("../styles/globalCurrency", () => ({
  getCurrencySymbol: jest.fn(),
}));

describe("DashboardOverview Component", () => {
  beforeEach(() => {
    getCurrencySymbol.mockImplementation((currency) => (currency === "INR" ? "₹" : "$"));
  });

  const renderComponent = (contextValue) => {
    render(
      <AppContext.Provider value={contextValue}>
        <DashboardOverview />
      </AppContext.Provider>
    );
  };

  it("renders the component correctly with default values", () => {
    const contextValue = { transactions: [], settings: {} };
    renderComponent(contextValue);

    expect(screen.getByText("Dashboard Overview")).toBeInTheDocument();
    expect(screen.getByText("Total Income")).toBeInTheDocument();
    expect(screen.getByText("Total Expenses")).toBeInTheDocument();
    expect(screen.getByText("Savings")).toBeInTheDocument();
    expect(screen.getByText("₹0.00")).toBeInTheDocument();
    expect(screen.getByText("Expense Distribution Chart")).toBeInTheDocument();
    expect(screen.getByText("Income Vs Expenditure Chart")).toBeInTheDocument();
  });

  it("calculates and displays total income, expenses, and savings", () => {
    const contextValue = {
      transactions: [
        { type: "income", amount: 5000 },
        { type: "income", amount: 2000 },
        { type: "expense", amount: 3000 },
      ],
      settings: { currency: "INR" },
    };

    renderComponent(contextValue);

    expect(screen.getByText("₹7000.00")).toBeInTheDocument(); // Total Income
    expect(screen.getByText("₹3000.00")).toBeInTheDocument(); // Total Expenses
    expect(screen.getByText("₹4000.00")).toBeInTheDocument(); // Savings
  });

  it("renders savings in red when negative", () => {
    const contextValue = {
      transactions: [
        { type: "income", amount: 2000 },
        { type: "expense", amount: 3000 },
      ],
      settings: { currency: "INR" },
    };

    renderComponent(contextValue);

    const savings = screen.getByText("₹0.00");
    expect(savings).toBeInTheDocument();
    expect(savings).toHaveStyle("color: red");
  });

  it("displays the correct currency symbol based on settings", () => {
    const contextValue = {
      transactions: [
        { type: "income", amount: 1000 },
        { type: "expense", amount: 500 },
      ],
      settings: { currency: "USD" },
    };

    renderComponent(contextValue);

    expect(screen.getByText("$1000.00")).toBeInTheDocument(); // Total Income
    expect(screen.getByText("$500.00")).toBeInTheDocument(); // Total Expenses
    expect(screen.getByText("$500.00")).toBeInTheDocument(); // Savings
  });
});
