"use client"
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { stockAtom } from '../lib/atoms';
import { getStock } from '../lib/api';
import StockList from '../components/StockList';

export default function Home() {
  const [stock, setStock] = useAtom(stockAtom);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const stockData = await getStock();
        setStock(stockData);
      } catch (error) {
        console.error('Failed to fetch stock:', error);
      }
    };
    fetchStock();
  }, [setStock]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Cervecería Stock</h1>
      <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          View Current Order
      </Link>
      <StockList />
    </div>
  );
}