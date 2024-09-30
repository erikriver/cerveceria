export type Beer = {
    name: string;
    price: number;
    quantity: number;
  }
  
  export type Stock = {
    last_updated: string;
    beers: Beer[];
  }
  
  export type Order = {
    created: string;
    paid: boolean;
    subtotal: number;
    taxes: number;
    discounts: number;
    items: OrderItem[];
    rounds: Round[];
  }
  
export type OrderItem = {
    name: string;
    price_per_unit: number;
    total: number;
}
  
export type Round = {
    created: string;
    items: RoundItem[];
  }
  
export type RoundItem = {
    name: string;
    quantity: number;
}
  