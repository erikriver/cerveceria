from app.models.domain import Order
from app.repositories.order import OrderRepository
from app.models.schemas import RoundItemSchema
from app.core.config import TAXES


def test_create_order(db_session):
    repository = OrderRepository(db_session)
    order = repository.create_order()

    assert order.id is not None
    assert order.created is not None


def test_add_round(db_session, sample_order):
    repository = OrderRepository(db_session)

    items = [RoundItemSchema(name="Corona", quantity=2), RoundItemSchema(name="Quilmes", quantity=1)]
    repository.add_round(order_id=sample_order.id, items=items)
    order_from_db = db_session.query(Order).filter_by(id=sample_order.id).first()

    assert len(order_from_db.rounds) == 1
    assert len(order_from_db.rounds[0].items) == 2
    assert order_from_db.rounds[0].items[0].name == "Corona"
    assert order_from_db.rounds[0].items[1].quantity == 1


def test_get_order(db_session, sample_order, sample_rounds, sample_round_items, sample_beers):
    repository = OrderRepository(db_session)

    sample_order.rounds = sample_rounds
    sample_rounds[0].items = sample_round_items[:2]
    sample_rounds[1].items = [sample_round_items[2]]

    order_schema = repository.get_order(sample_order.id)

    assert order_schema is not None
    assert order_schema.subtotal == (115 * 2) + (120 * 1) + (110 * 1)  # Corona(2) + Quilmes(1) + Club Colombia(1)
    assert order_schema.taxes == order_schema.subtotal * TAXES
    assert len(order_schema.items) == 3
    assert order_schema.items[0].name == "Corona"
    assert order_schema.items[0].total == 115 * 2
    assert order_schema.rounds[0].items[0].name == "Corona"
    assert len(order_schema.rounds) == 2
