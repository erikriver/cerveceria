import pytest
from datetime import datetime, timedelta
from app.models.domain import Beer, Order, Round, RoundItem
from app.models.schemas import BeerSchema, OrderSchema, RoundSchema, RoundItemSchema, OrderItemSchema


@pytest.fixture
def sample_beers():
    return [
        Beer(id=1, name="Corona", price=115, quantity=50),
        Beer(id=2, name="Quilmes", price=120, quantity=30),
        Beer(id=3, name="Club Colombia", price=110, quantity=40),
    ]
