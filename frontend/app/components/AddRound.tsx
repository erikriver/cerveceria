import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { stockAtom, currentOrderAtom, orderIdAtom } from '../lib/atoms';
import { addRound, getOrder } from '../lib/api';

const AddRound: React.FC = () => {
  const [stock, setStock] = useAtom(stockAtom);
  const [, setCurrentOrder] = useAtom(currentOrderAtom);
  const [orderId] = useAtom(orderIdAtom);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (beerName: string, quantity: number) => {
    setQuantities(prev => ({ ...prev, [beerName]: quantity }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !stock) return;

    const items = Object.entries(quantities)
      .filter(([, quantity]) => quantity > 0)
      .map(([name, quantity]) => ({ name, quantity }));

    try {
      await addRound(orderId, items);
      const updatedOrder = await getOrder(orderId);
      setCurrentOrder(updatedOrder);

      // Update stock
      const updatedStock = {
        ...stock,
        beers: stock.beers.map(beer => {
          const orderedQuantity = items.find(item => item.name === beer.name)?.quantity || 0;
          return { ...beer, quantity: beer.quantity - orderedQuantity };
        })
      };
      setStock(updatedStock);

      // Reset quantities
      setQuantities({});
    } catch (error) {
      console.error('Failed to add round:', error);
    }
  };

  if (!stock) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold">Add New Round</h3>
      {stock.beers.map((beer) => (
        <div key={beer.name} className="flex items-center space-x-2">
          <label htmlFor={`beer-${beer.name}`} className="w-1/2">{beer.name}</label>
          <input
            type="number"
            id={`beer-${beer.name}`}
            min="0"
            max={beer.quantity}
            value={quantities[beer.name] || 0}
            onChange={(e) => handleQuantityChange(beer.name, parseInt(e.target.value) || 0)}
            className="w-20 p-1 border rounded"
          />
          <span>Available: {beer.quantity}</span>
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Round
      </button>
    </form>
  );
};

export default AddRound;