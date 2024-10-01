import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "jotai";
import StockList from "../components/StockList";
import { stockAtom } from "../lib/atoms";
import { useHydrateAtoms } from "jotai/utils";
import userEvent from "@testing-library/user-event";

jest.mock("../lib/api", () => ({
  updateBeer: jest.fn(() =>
    Promise.resolve({ name: "Corona", price: 120, quantity: 50 })
  ),
}));

const mockStock = {
  last_updated: new Date().toISOString(),
  beers: [
    { name: "Corona", price: 100, quantity: 50 },
    { name: "Heineken", price: 110, quantity: 30 },
  ],
};

const HydrateAtoms = ({
  initialValues,
  children,
}: {
  initialValues: any;
  children: React.ReactNode;
}) => {
  useHydrateAtoms(initialValues);
  return children;
};

const TestProvider = ({
  initialValues,
  children,
}: {
  initialValues: any;
  children: React.ReactNode;
}) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);

describe("StockList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders stock list", () => {
    render(
      <TestProvider initialValues={[[stockAtom, mockStock]]}>
        <StockList />
      </TestProvider>
    );

    expect(screen.getByText("Corona")).toBeInTheDocument();
    expect(screen.getByText("Heineken")).toBeInTheDocument();
  });

  it("updates beer price when input changes", async () => {
    render(
      <TestProvider initialValues={[[stockAtom, mockStock]]}>
        <StockList />
      </TestProvider>
    );

    const priceInput = screen.getByTestId("price-input-Corona");

    await waitFor(() => {
      fireEvent.change(priceInput, { target: { value: 120 } });
      expect(priceInput).toHaveValue(120);
    });
  });

  it("updates beer quantity when input changes", async () => {
    render(
      <TestProvider initialValues={[[stockAtom, mockStock]]}>
        <StockList />
      </TestProvider>
    );

    const quantityInput = screen.getByTestId("quantity-input-Corona");
    await userEvent.clear(quantityInput);
    await userEvent.type(quantityInput, "60");

    await waitFor(() => {
      expect(quantityInput).toHaveValue(60);
    });
  });
});