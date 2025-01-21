import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppContext } from "../context/AppContext";
import ExpenseForm from "./ExpenseForm";

describe("ExpenseForm Component", () => {
  const mockAddTransaction = jest.fn();

  const renderComponent = (contextValue) => {
    render(
      <AppContext.Provider value={contextValue}>
        <ExpenseForm />
      </AppContext.Provider>
    );
  };

  const contextValue = {
    addTransaction: mockAddTransaction,
    categories: ["Food", "Travel", "Utilities"],
    budgets: { Food: 5000, Travel: 2000 },
    transactions: [
      { type: "expense", category: "Food", amount: 3000 },
      { type: "expense", category: "Travel", amount: 1500 },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component correctly", () => {
    renderComponent(contextValue);

    expect(screen.getByLabelText("Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Amount")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Date")).toBeInTheDocument();
    expect(screen.getByText("Add Transaction")).toBeInTheDocument();
  });

  it("handles input changes correctly", () => {
    renderComponent(contextValue);

    const titleInput = screen.getByLabelText("Title");
    fireEvent.change(titleInput, { target: { value: "Groceries" } });
    expect(titleInput.value).toBe("Groceries");

    const amountInput = screen.getByLabelText("Amount");
    fireEvent.change(amountInput, { target: { value: "1500" } });
    expect(amountInput.value).toBe("1500");

    const categoryInput = screen.getByLabelText("Category");
    fireEvent.change(categoryInput, { target: { value: "Food" } });
    expect(categoryInput.value).toBe("Food");
  });

  it("validates form fields before submission", () => {
    renderComponent(contextValue);

    fireEvent.click(screen.getByText("Add Transaction"));

    expect(screen.getByText("Please fill in all required fields.")).toBeInTheDocument();
    expect(mockAddTransaction).not.toHaveBeenCalled();
  });

  it("disables category input when type is income", () => {
    renderComponent(contextValue);

    const typeInput = screen.getByLabelText("Type");
    fireEvent.change(typeInput, { target: { value: "income" } });

    const categoryInput = screen.getByLabelText("Category");
    expect(categoryInput).toBeDisabled();
  });

  it("displays a warning if the transaction exceeds the budget", () => {
    renderComponent(contextValue);

    const titleInput = screen.getByLabelText("Title");
    fireEvent.change(titleInput, { target: { value: "Dinner" } });

    const amountInput = screen.getByLabelText("Amount");
    fireEvent.change(amountInput, { target: { value: "2500" } });

    const categoryInput = screen.getByLabelText("Category");
    fireEvent.change(categoryInput, { target: { value: "Food" } });

    const dateInput = screen.getByLabelText("Date");
    fireEvent.change(dateInput, { target: { value: "2023-12-01" } });

    window.alert = jest.fn();
    fireEvent.click(screen.getByText("Add Transaction"));

    expect(window.alert).toHaveBeenCalledWith(
      "Warning: This transaction exceeds the budget for Food. Budget: 5000, Spending: 5500."
    );
  });

  it("submits the form successfully with valid data", () => {
    renderComponent(contextValue);

    const titleInput = screen.getByLabelText("Title");
    fireEvent.change(titleInput, { target: { value: "Groceries" } });

    const amountInput = screen.getByLabelText("Amount");
    fireEvent.change(amountInput, { target: { value: "2000" } });

    const categoryInput = screen.getByLabelText("Category");
    fireEvent.change(categoryInput, { target: { value: "Food" } });

    const dateInput = screen.getByLabelText("Date");
    fireEvent.change(dateInput, { target: { value: "2023-12-01" } });

    fireEvent.click(screen.getByText("Add Transaction"));

    expect(mockAddTransaction).toHaveBeenCalledWith({
      type: "expense",
      title: "Groceries",
      amount: 2000,
      category: "Food",
      date: "2023-12-01T00:00:00.000Z",
    });

    expect(titleInput.value).toBe("");
    expect(amountInput.value).toBe("");
    expect(categoryInput.value).toBe("");
    expect(dateInput.value).toBe("");
  });

  it("prevents duplicate submissions", () => {
    renderComponent(contextValue);

    const titleInput = screen.getByLabelText("Title");
    fireEvent.change(titleInput, { target: { value: "Groceries" } });

    const amountInput = screen.getByLabelText("Amount");
    fireEvent.change(amountInput, { target: { value: "2000" } });

    const categoryInput = screen.getByLabelText("Category");
    fireEvent.change(categoryInput, { target: { value: "Food" } });

    const dateInput = screen.getByLabelText("Date");
    fireEvent.change(dateInput, { target: { value: "2023-12-01" } });

    fireEvent.click(screen.getByText("Add Transaction"));
    fireEvent.click(screen.getByText("Add Transaction"));

    expect(mockAddTransaction).toHaveBeenCalledTimes(1);
  });
});
