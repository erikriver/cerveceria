import axios from "axios";
import {Beer, Stock, RoundItem, Order} from "./types"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
});


export const getStock = async (): Promise<Stock> => {
  const response = await api.get<Stock>("/stock");
  return response.data;
};

export const updateBeer = async (
    beerName: string, 
    data: { price?: number; quantity?: number }
): Promise<Beer> => {
    const response = await api.put<Beer>(`/stock/${beerName}`, data);
    return response.data;
  };

export const createOrder = async (): Promise<number> => {
  const response = await api.post<number>("/orders");
  return response.data;
};

export const addRound = async (
  orderId: number,
  items: RoundItem[]
): Promise<void> => {
  await api.post(`/orders/${orderId}/rounds`, items);
};

export const getOrder = async (orderId: number): Promise<Order> => {
  const response = await api.get<Order>(`/orders/${orderId}`);
  return response.data;
};
