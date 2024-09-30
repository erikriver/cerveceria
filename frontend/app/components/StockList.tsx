// components/StockList.tsx
import React from 'react';
import { useAtom } from 'jotai';
import { stockAtom } from '../lib/atoms';
import { updateBeer } from '../lib/api';

const StockList: React.FC = () => {
  const [stock, setStock] = useAtom(stockAtom);

  const handleUpdateBeer = async (name: string, field: 'price' | 'quantity', value: string) => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      console.error('Invalid input: Not a number');
      return;
    }

    try {
      const updatedBeer = await updateBeer(name, { [field]: numericValue });
      setStock(prev => {
        if (!prev) return prev;
        const updatedBeers = prev.beers.map(beer => 
          beer.name === name ? updatedBeer : beer
        );
        return { ...prev, beers: updatedBeers };
      });
    } catch (error) {
      console.error('Failed to update beer:', error);
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
              step="1"
              value={beer.price}
              onChange={(e) => handleUpdateBeer(beer.name, 'price', e.target.value)}
              className="w-20 mr-2 p-1 border rounded"
            />
            <input
              type="number"
              value={beer.quantity}
              onChange={(e) => handleUpdateBeer(beer.name, 'quantity', e.target.value)}
              className="w-20 p-1 border rounded"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StockList;