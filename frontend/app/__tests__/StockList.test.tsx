import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'jotai';
import StockList from '../components/StockList';
import { stockAtom } from '../lib/atoms';

jest.mock('../lib/api', () => ({
  updateBeer: jest.fn(() => Promise.resolve({ name: 'Corona', price: 120, quantity: 50 })),
}));

const mockStock = {
  last_updated: new Date().toISOString(),
  beers: [
    { name: 'Corona', price: 100, quantity: 50 },
    { name: 'Heineken', price: 110, quantity: 30 },
  ],
};

describe('StockList', () => {
  it('renders stock list', () => {
    render(
      <Provider initialValues={[[stockAtom, mockStock]]}>
        <StockList />
      </Provider>
    );

    expect(screen.getByText('Corona')).toBeInTheDocument();
    expect(screen.getByText('Heineken')).toBeInTheDocument();
  });

  it('updates beer price when input changes', async () => {
    render(
      <Provider initialValues={[[stockAtom, mockStock]]}>
        <StockList />
      </Provider>
    );

    const priceInput = screen.getByTestId('price-input-Corona');
    fireEvent.change(priceInput, { target: { value: '120' } });

    expect(priceInput).toHaveValue(120);
  });

  it('updates beer quantity when input changes', async () => {
    render(
      <Provider initialValues={[[stockAtom, mockStock]]}>
        <StockList />
      </Provider>
    );

    const quantityInput = screen.getByTestId('quantity-input-Corona');
    fireEvent.change(quantityInput, { target: { value: '60' } });

    expect(quantityInput).toHaveValue(60);
  });
});