import pytest
from datetime import datetime, timedelta

from app.models.domain import Beer, Order, Round, RoundItem
from app.models.domain import Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# from app.core.config import SessionLocal, engine


@pytest.fixture(scope="function")
def db_session():
    SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"


    engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture
def sample_beers(db_session):
    beers = [
        Beer(name="Corona", price=115, quantity=50),
        Beer(name="Quilmes", price=120, quantity=30),
        Beer(name="Club Colombia", price=110, quantity=40),
    ]
    db_session.add_all(beers)
    db_session.commit()

    return beers


@pytest.fixture
def sample_order(db_session):
    order = Order(created=datetime.now(), paid=False, subtotal=460, taxes=73.6, discounts=0)
    db_session.add(order)
    db_session.commit()

    return order


@pytest.fixture
def sample_rounds(db_session, sample_order):
    round1 = Round(created=datetime.now() - timedelta(minutes=30), order_id=sample_order.id)
    round2 = Round(created=datetime.now() - timedelta(minutes=15), order_id=sample_order.id)

    db_session.add_all([round1, round2])
    db_session.commit()

    return [round1, round2]


@pytest.fixture
def sample_round_items(db_session, sample_rounds):
    from app.models.domain import RoundItem

    items = [
        RoundItem(name="Corona", quantity=2, round_id=sample_rounds[0].id),
        RoundItem(name="Quilmes", quantity=1, round_id=sample_rounds[0].id),
        RoundItem(name="Club Colombia", quantity=1, round_id=sample_rounds[1].id),
    ]

    db_session.add_all(items)
    db_session.commit()

    return items
