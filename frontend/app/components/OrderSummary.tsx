import React from 'react';
import { useAtom } from 'jotai';
import { currentOrderAtom } from '../lib/atoms';

const OrderSummary: React.FC = () => {
  const [currentOrder] = useAtom(currentOrderAtom);

  if (!currentOrder) return null;

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <p>Created: {new Date(currentOrder.created).toLocaleString()}</p>
      <p>Subtotal: ${currentOrder.subtotal.toFixed(2)}</p>
      <p>Taxes: ${currentOrder.taxes.toFixed(2)}</p>
      <p>Discounts: ${currentOrder.discounts.toFixed(2)}</p>
      <p>Total: ${(currentOrder.subtotal + currentOrder.taxes - currentOrder.discounts).toFixed(2)}</p>
      <h3 className="text-lg font-semibold mt-4 mb-2">Rounds:</h3>
      {currentOrder.rounds.map((round, index) => (
        <div key={index} className="mb-2">
          <p>Round {index + 1} - {new Date(round.created).toLocaleString()}</p>
          <ul className="list-disc list-inside">
            {round.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item.name}: {item.quantity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderSummary;