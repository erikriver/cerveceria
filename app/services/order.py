from app.repositories.order import OrderRepository
from app.repositories.stock import StockRepository
from app.models.schemas import OrderSchema, RoundItemSchema
from typing import List


class OrderService:
    def __init__(self, order_repository: OrderRepository, stock_repository: StockRepository):
        self.order_repository = order_repository
        self.stock_repository = stock_repository

    def create_order(self) -> int:
        order = self.order_repository.create_order()
        return order.id

    def add_round(self, order_id: int, items: List[RoundItemSchema]) -> None:
        stock = self.stock_repository.get_stock()
        for item in items:
            beer = next((b for b in stock.beers if b.name == item.name), None)
            if not beer or beer.quantity < item.quantity:
                raise ValueError(f"Not enough stock for {item.name}")
            self.stock_repository.update_stock(item.name, -item.quantity)
        self.order_repository.add_round(order_id, items)

    def get_order(self, order_id: int) -> OrderSchema:
        return self.order_repository.get_order(order_id)
