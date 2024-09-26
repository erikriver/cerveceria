from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class Beer(Base):
    __tablename__ = "beers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True) # I want to use this as a search key
    price = Column(Float)
    quantity = Column(Integer)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    created = Column(DateTime)
    paid = Column(Boolean, default=False)
    subtotal = Column(Float, default=0)
    taxes = Column(Float, default=0)
    discounts = Column(Float, default=0)
    rounds = relationship("Round", back_populates="order")

class Round(Base):
    __tablename__ = "rounds"

    id = Column(Integer, primary_key=True, index=True)
    created = Column(DateTime)
    order_id = Column(Integer, ForeignKey("orders.id"))
    order = relationship("Order", back_populates="rounds")
    items = relationship("RoundItem")

class RoundItem(Base):
    __tablename__ = "round_items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    quantity = Column(Integer)
    round_id = Column(Integer, ForeignKey("rounds.id"))

class Promotion(Base):
    __tablename__ = "promotions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    discount_percentage = Column(Float)
    buy_quantity = Column(Integer)
    get_quantity = Column(Integer)
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    is_active = Column(Boolean, default=True)
