from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.config import get_db
from typing import List

router = APIRouter()


@router.get("/stock")
def get_stock():
    """Get the stock number of each beer"""
    return "OK"

@router.put("/stock/{beer_name}")
def update_beer(beer_name: str):
    """Update the stock of each beer, the purpose of this endpoint is only to affect the attribute `last_updated` on beers stock"""
    return beer_name

@router.post("/orders")
def create_order():
    """Create an order"""
    return "OK"

@router.post("/orders/{order_id}/rounds")
def add_round(order_id: int):
    """Add a round of beers"""
    return "OK"

@router.get("/orders/{order_id}")
def get_order(order_id: int):
    order = {"lorem": "ipsum"}
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order