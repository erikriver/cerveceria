import { atom } from 'jotai';
import { Stock, Order } from './types';

export const stockAtom = atom<Stock | null>(null);
export const currentOrderAtom = atom<Order | null>(null);
export const orderIdAtom = atom<number | null>(null);