"use client"
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { stockAtom, currentOrderAtom, orderIdAtom } from './lib/atoms';
import { getStock, getOrder, createOrder } from './lib/api';
import OrderSummary from './components/OrderSummary';
import AddRound from './components/AddRound';
import Link from 'next/link';

export default function CurrentOrder() {
  const [stock, setStock] = useAtom(stockAtom);
  const [currentOrder, setCurrentOrder] = useAtom(currentOrderAtom);
  const [orderId, setOrderId] = useAtom(orderIdAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!stock) {
          const stockData = await getStock();
          setStock(stockData);
        }

        if (!orderId) {
          const newOrderId = await createOrder();
          setOrderId(newOrderId);
        }

        if (orderId) {
          const orderData = await getOrder(orderId);
          setCurrentOrder(orderData);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [stock, orderId, setStock, setOrderId, setCurrentOrder]);

  return (
    <div className="space-y-8">
      <Link href="/stock-list" className="text-blue-500 hover:underline">
        Go to Stock List
      </Link>
      <h1 className="text-3xl font-bold">Current Order</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <OrderSummary />
        </div>
        <div>
          <AddRound />
        </div>
      </div>
    </div>
  );
}