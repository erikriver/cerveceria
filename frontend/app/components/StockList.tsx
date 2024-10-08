import React, { useState } from "react";
import { useAtom } from "jotai";
import { stockAtom } from "../lib/atoms";
import { updateBeer } from "../lib/api";

const StockList: React.FC = () => {
  const [stock, setStock] = useAtom(stockAtom);
  const [editingValues, setEditingValues] = useState<{
    [key: string]: { price: string; quantity: string };
  }>({});

  // Initialize editing values if stock changes
  React.useEffect(() => {
    if (stock) {
      const initialValues = stock.beers.reduce((acc, beer) => {
        acc[beer.name] = {
          price: beer.price.toString(),
          quantity: beer.quantity.toString(),
        };
        return acc;
      }, {} as { [key: string]: { price: string; quantity: string } });
      setEditingValues(initialValues);
    }
  }, [stock]);

  // Handle input changes locally without updating the atom state immediately
  const handleInputChange = (
    name: string,
    field: "price" | "quantity",
    value: string
  ) => {
    setEditingValues((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        [field]: value,
      },
    }));
  };

  // Handle update when the input loses focus
  const handleBlur = async (name: string, field: "price" | "quantity") => {
    const value = editingValues[name][field];
    const numericValue = parseFloat(value);

    if (isNaN(numericValue)) {
      console.error("Invalid input: Not a number");
      return;
    }

    try {
      // Update the atom state and the backend
      await updateBeer(name, { [field]: numericValue });
      setStock((prev) => {
        if (!prev) return prev;
        const updatedBeers = prev.beers.map((beer) =>
          beer.name === name ? { ...beer, [field]: numericValue } : beer
        );
        return { ...prev, beers: updatedBeers };
      });
    } catch (error) {
      console.error("Failed to update beer:", error);
    }
  };

  if (!stock) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stock.beers.map((beer) => (
        <div key={beer.name} className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold">{beer.name}</h3>
          <p>Price: ${beer.price.toFixed(2)}</p>
          <p>Quantity: {beer.quantity}</p>
          <div className="mt-2">
            <input
              type="number"
              step="0.01"
              value={editingValues[beer.name]?.price || ""}
              onChange={(e) =>
                handleInputChange(beer.name, "price", e.target.value)
              }
              onBlur={() => handleBlur(beer.name, "price")}
              className="w-20 mr-2 p-1 border rounded"
              data-testid={`price-input-${beer.name}`}
              aria-label={`Price for ${beer.name}`}
            />
            <input
              type="number"
              step="1"
              value={editingValues[beer.name]?.quantity || ""}
              onChange={(e) =>
                handleInputChange(beer.name, "quantity", e.target.value)
              }
              onBlur={() => handleBlur(beer.name, "quantity")}
              className="w-20 p-1 border rounded"
              data-testid={`quantity-input-${beer.name}`}
              aria-label={`Quantity for ${beer.name}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StockList;
