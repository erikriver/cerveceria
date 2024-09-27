from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.config import get_db
from app.services.stock import StockService
from app.services.order import OrderService
from app.repositories.stock import StockRepository
from app.repositories.order import OrderRepository
from app.models.schemas import StockSchema, OrderSchema, RoundItemSchema, BeerUpdateSchema, BeerSchema
from app.models.domain import Beer
from typing import List

router = APIRouter()


def get_stock_service(db: Session = Depends(get_db)):
    return StockService(StockRepository(db))


def get_order_service(db: Session = Depends(get_db)):
    return OrderService(OrderRepository(db), StockRepository(db))


@router.get("/stock", response_model=StockSchema)
def get_stock(stock_service: StockService = Depends(get_stock_service)):
    """Get the stock number of each beer"""
    return stock_service.get_stock()


@router.put("/stock/{beer_name}", response_model=BeerSchema)
def update_beer(
    beer_name: str, update_data: BeerUpdateSchema, stock_service: StockService = Depends(get_stock_service)
):
    """Update the stock of each beer, the purpose of this endpoint is only to affect the attribute `last_updated` on beers stock"""
    updated_beer = stock_service.update_beer(beer_name, update_data)
    if not updated_beer:
        raise HTTPException(status_code=404, detail="Beer not found")
    return updated_beer


@router.post("/orders", response_model=int)
def create_order(order_service: OrderService = Depends(get_order_service)):
    """Create an order"""
    return order_service.create_order()


@router.post("/orders/{order_id}/rounds")
def add_round(order_id: int, items: List[RoundItemSchema], order_service: OrderService = Depends(get_order_service)):
    """Add a round of beers"""
    try:
        order_service.add_round(order_id, items)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/orders/{order_id}", response_model=OrderSchema)
def get_order(order_id: int, order_service: OrderService = Depends(get_order_service)):
    order = order_service.get_order(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
