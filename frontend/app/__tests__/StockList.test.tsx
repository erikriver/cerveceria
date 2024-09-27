import React from "react";
import { render, screen } from "@testing-library/react";
import StockList from "../components/StockList";

const mockStock = {
  last_updated: "2024-09-27T10:11:00Z",
  beers: [
    { name: "Corona", price: 110, quantity: 120 },
    { name: "Strella", price: 120, quantity: 80 },
  ],
};

describe("StockList", () => {
  it("Stock information correctly", () => {
    render(<StockList stock={mockStock} onStockUpdate={() => {}} />);

    expect(screen.getByText("Stock")).toBeInTheDocument();
    expect(screen.getByText("Corona")).toBeInTheDocument();
    expect(screen.getByText("Strella")).toBeInTheDocument();
    expect(screen.getByText("Price: $110")).toBeInTheDocument();
    expect(screen.getByText("Quantity: 120")).toBeInTheDocument();
  });
});
