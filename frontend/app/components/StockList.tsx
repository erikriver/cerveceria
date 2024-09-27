import React from "react";
import { Stock, Beer, updateBeer } from "../lib/api";

interface StockListProps {
  stock: Stock;
  onStockUpdate: () => void;
}

const StockList: React.FC<StockListProps> = ({ stock, onStockUpdate }) => {
  const handleUpdate = async (beer: Beer) => {
    try {
      await updateBeer(beer.name, beer.price, beer.quantity);
      onStockUpdate();
    } catch (error) {
      console.error("Failed on update:", error);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Stock</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Last updated: {new Date(stock.last_updated).toLocaleString()}
        </p>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {stock.beers.map((beer) => (
            <li key={beer.name} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-indigo-600">
                  {beer.name}
                </div>
                <div className="ml-2 flex-shrink-0 flex">
                  <button
                    onClick={() => handleUpdate(beer)}
                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >
                    Update
                  </button>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    Price: ${beer.price.toFixed(2)}
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                    Quantity: {beer.quantity}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StockList;
