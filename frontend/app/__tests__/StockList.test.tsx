import React from 'react';
import { render, screen } from '@testing-library/react';
import StockList from '../components/StockList';

const mockStock = {
  last_updated: '2023-05-01T12:00:00Z',
  beers: [
    { name: 'IPA', price: 5.99, quantity: 100 },
    { name: 'Stout', price: 6.99, quantity: 50 },
  ],
};

describe('StockList', () => {
  it('renders stock information correctly', () => {
    render(<StockList stock={mockStock} onStockUpdate={() => {}} />);

    expect(screen.getByText('Stock')).toBeInTheDocument();
    expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
    expect(screen.getByText('IPA')).toBeInTheDocument();
    expect(screen.getByText('Stout')).toBeInTheDocument();
    expect(screen.getByText('Price: $5.99')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 100')).toBeInTheDocument();
  });
});