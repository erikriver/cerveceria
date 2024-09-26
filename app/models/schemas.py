from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class BeerSchema(BaseModel):
    name: str
    price: float
    quantity: int


class StockSchema(BaseModel):
    last_updated: datetime
    beers: List[BeerSchema]


class OrderItemSchema(BaseModel):
    name: str
    price_per_unit: float
    total: float


class RoundItemSchema(BaseModel):
    name: str
    quantity: int


class RoundSchema(BaseModel):
    created: datetime
    items: List[RoundItemSchema]


class OrderSchema(BaseModel):
    created: datetime
    paid: bool
    subtotal: float
    taxes: float
    discounts: float
    items: List[OrderItemSchema]
    rounds: List[RoundSchema]


class PromotionSchema(BaseModel):
    name: str
    description: str
    discount_percentage: Optional[float] = None
    buy_quantity: Optional[int] = None
    get_quantity: Optional[int] = None
    start_time: datetime
    end_time: datetime
    is_active: bool


class BeerUpdateSchema(BaseModel):
    price: Optional[float] = None
    quantity: Optional[int] = None
