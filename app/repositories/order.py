from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.domain import Order, Round, RoundItem, Beer
from app.models.schemas import OrderSchema, RoundSchema, RoundItemSchema, OrderItemSchema
from app.core.config import TAXES
from datetime import datetime


class OrderRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_order(self) -> Order:
        order = Order(created=datetime.now())
        self.db.add(order)
        self.db.commit()
        return order

    def add_round(self, order_id: int, items: list[RoundItemSchema]) -> None:
        round_ = Round(created=datetime.now(), order_id=order_id)
        self.db.add(round_)
        self.db.flush()
        for item in items:
            round_item = RoundItem(name=item.name, quantity=item.quantity, round_id=round_.id)
            self.db.add(round_item)
        self.db.commit()

    def get_order(self, order_id: int) -> OrderSchema:
        order = self.db.query(Order).filter(Order.id == order_id).first()
        if not order:
            return None

        rounds = []
        items_dict = {}

        for round in order.rounds:
            round_items = []
            for item in round.items:
                round_items.append(RoundItemSchema(name=item.name, quantity=item.quantity))

                if item.name in items_dict:
                    items_dict[item.name] += item.quantity
                else:
                    items_dict[item.name] = item.quantity

            rounds.append(RoundSchema(created=round.created, items=round_items))

        items = []
        subtotal = 0
        for name, quantity in items_dict.items():
            beer = self.db.query(Beer).filter(Beer.name == name).first()
            if beer:
                total = beer.price * quantity
                items.append(OrderItemSchema(name=name, price_per_unit=beer.price, total=total))
                subtotal += total

        taxes = subtotal * TAXES
        discounts = 0  # no discount calculation at the moment

        return OrderSchema(
            created=order.created,
            paid=order.paid,
            subtotal=subtotal,
            taxes=taxes,
            discounts=discounts,
            items=items,
            rounds=rounds,
        )
