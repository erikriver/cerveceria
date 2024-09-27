import pytest
from unittest.mock import Mock, patch
from datetime import datetime
from sqlalchemy.orm import Session
from app.repositories.stock import StockRepository
from app.models.domain import Beer
from app.models.schemas import StockSchema, BeerUpdateSchema


@pytest.fixture
def stock_repository(db_session):
    return StockRepository(db_session)


def test_get_stock(stock_repository, sample_beers):
    result = stock_repository.get_stock()

    assert isinstance(result, StockSchema)
    assert len(result.beers) == len(sample_beers)
    for i, beer in enumerate(result.beers):
        assert beer.name == sample_beers[i].name
        assert beer.price == sample_beers[i].price
        assert beer.quantity == sample_beers[i].quantity


def test_update_stock(stock_repository, db_session, sample_beers):
    beer_name = "Corona"
    stock_repository.update_stock(beer_name, -2)
    beer = db_session.query(Beer).filter(Beer.name == beer_name).first()
    assert beer.quantity == 48


def test_update_beer(stock_repository, sample_beers, db_session):
    beer_name = "Corona"
    update_data = BeerUpdateSchema(price=120, quantity=48)
    stock_repository.update_beer(beer_name, update_data)

    beer = db_session.query(Beer).filter(Beer.name == beer_name).first()
    assert beer.price == 120
    assert beer.quantity == 48
