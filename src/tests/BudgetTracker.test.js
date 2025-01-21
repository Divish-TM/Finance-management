import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppContext } from "../context/AppContext";
import BudgetTracker from "./BudgetTracker";
import { getCurrencySymbol } from "../styles/globalCurrency";

jest.mock("../styles/globalCurrency", () => ({
  getCurrencySymbol: jest.fn(),
}));

describe("BudgetTracker Component", () => {
  beforeEach(() => {
    getCurrencySymbol.mockImplementation((currency) => (currency === "INR" ? "₹" : "$"));
  });

  const mockSetBudget = jest.fn();

  const renderComponent = (contextValue) => {
    render(
      <AppContext.Provider value={contextValue}>
        <BudgetTracker />
      </AppContext.Provider>
    );
  };

  it("renders the component correctly with budgets and transactions", () => {
    const contextValue = {
      budgets: { Food: 5000, Travel: 2000 },
      transactions: [{ type: "expense", category: "Food", amount: 3000 }],
      setBudget: mockSetBudget,
      settings: { currency: "INR" },
    };

    renderComponent(contextValue);

    expect(screen.getByText("Budget Tracker")).toBeInTheDocument();
    expect(screen.getByText("Food: ₹3000.00 / ₹5000.00")).toBeInTheDocument();
    expect(screen.getByText("Travel: ₹0.00 / ₹2000.00")).toBeInTheDocument();
  });

  it("displays an alert when spending exceeds the budget", () => {
    const contextValue = {
      budgets: { Food: 5000 },
      transactions: [
        { type: "expense", category: "Food", amount: 3000 },
        { type: "expense", category: "Food", amount: 2500 }, // This exceeds the budget
      ],
      setBudget: mockSetBudget,
      settings: { currency: "INR" },
    };

    window.alert = jest.fn();

    renderComponent(contextValue);

    expect(window.alert).toHaveBeenCalledWith(
      "Alert: Spending for Food exceeds the budget of ₹5000!"
    );
  });

  it("opens the edit budget dialog and updates the budget", () => {
    const contextValue = {
      budgets: { Food: 5000 },
      transactions: [],
      setBudget: mockSetBudget,
      settings: { currency: "INR" },
    };

    renderComponent(contextValue);

    const editButton = screen.getByText("Edit Budget");
    fireEvent.click(editButton);

    expect(screen.getByText("Edit Budget")).toBeInTheDocument();
    expect(screen.getByText("Category: Food")).toBeInTheDocument();

    const input = screen.getByLabelText("New Budget");
    fireEvent.change(input, { target: { value: "6000" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(mockSetBudget).toHaveBeenCalledWith("Food", 6000);
  });

  it("prevents saving a budget less than or equal to zero", () => {
    const contextValue = {
      budgets: { Food: 5000 },
      transactions: [],
      setBudget: mockSetBudget,
      settings: { currency: "INR" },
    };

    window.alert = jest.fn();

    renderComponent(contextValue);

    const editButton = screen.getByText("Edit Budget");
    fireEvent.click(editButton);

    const input = screen.getByLabelText("New Budget");
    fireEvent.change(input, { target: { value: "0" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(window.alert).toHaveBeenCalledWith("Budget must be greater than 0");
    expect(mockSetBudget).not.toHaveBeenCalled();
  });

  it("does not alert for already alerted categories", () => {
    const contextValue = {
      budgets: { Food: 5000 },
      transactions: [
        { type: "expense", category: "Food", amount: 3000 },
        { type: "expense", category: "Food", amount: 2500 },
      ],
      setBudget: mockSetBudget,
      settings: { currency: "INR" },
    };

    window.alert = jest.fn();

    renderComponent(contextValue);

    expect(window.alert).toHaveBeenCalledTimes(1); // Only one alert
  });
});
