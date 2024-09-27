"use client";

import React, { useState, useEffect } from "react";
import { getStock, Stock, getOrder, Order } from "./lib/api";
import StockList from "./components/StockList";
import OrderForm from "./components/OrderForm";
import OrderDetails from "./components/OrderDetails";

const Home: React.FC = () => {
  const [stock, setStock] = useState<Stock | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  const fetchStock = async () => {
    try {
      const stockData = await getStock();
      setStock(stockData);
    } catch (error) {
      console.error("Error on fetch stock:", error);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const handleOrderCreated = async (orderId: number) => {
    try {
      const orderData = await getOrder(orderId);
      setOrder(orderData);
    } catch (error) {
      console.error("Error on fetch order:", error);
    }
  };

  return (
    <div className="max-w-7xl py-6 mx-auto sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900">
          Beer Orders
        </h1>
        <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2">
          <div>
            {stock && <StockList stock={stock} onStockUpdate={fetchStock} />}
          </div>
          <div>
            <OrderForm onOrderCreated={handleOrderCreated} />
            {order && <OrderDetails order={order} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
