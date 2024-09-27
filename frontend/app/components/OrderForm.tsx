import React, { useState } from "react";
import { createOrder, addRound, RoundItem } from "../lib/api";

interface OrderFormProps {
  onOrderCreated: (orderId: number) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onOrderCreated }) => {
  const [items, setItems] = useState<RoundItem[]>([{ name: "", quantity: 1 }]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const orderId = await createOrder();
      await addRound(orderId, items);
      onOrderCreated(orderId);
      setItems([{ name: "", quantity: 1 }]);
    } catch (error) {
      console.error("Order can't created:", error);
    }
  };

  const handleItemChange = (
    index: number,
    field: keyof RoundItem,
    value: string | number
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1 }]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 divide-y divide-gray-200"
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Create Order
          </h3>
          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            {items.map((item, index) => (
              <div
                key={index}
                className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
              >
                <label
                  htmlFor={`item-name-${index}`}
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Beer Name
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name={`item-name-${index}`}
                    id={`item-name-${index}`}
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <label
                  htmlFor={`item-quantity-${index}`}
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Quantity
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    name={`item-quantity-${index}`}
                    id={`item-quantity-${index}`}
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "quantity",
                        parseInt(e.target.value)
                      )
                    }
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={addItem}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add item
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create order
          </button>
        </div>
      </div>
    </form>
  );
};

export default OrderForm;
