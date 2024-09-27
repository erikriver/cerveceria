import pytest
from app.services.stock import StockService
from app.repositories.stock import StockRepository
from app.models.schemas import StockSchema, BeerUpdateSchema
from app.models.domain import Beer


def test_get_stock(db_session, sample_beers):
    stock_repo = StockRepository(db_session)
    stock_service = StockService(stock_repo)

    result = stock_service.get_stock()

    assert isinstance(result, StockSchema)
    assert len(result.beers) == 3
    assert result.beers[0].name == "Corona"
    assert result.beers[0].price == 115
    assert result.beers[0].quantity == 50


def test_update_stock(db_session, sample_beers):
    stock_repo = StockRepository(db_session)
    stock_service = StockService(stock_repo)

    stock_service.update_stock("Corona", -2)

    updated_beer = db_session.query(Beer).filter(Beer.name == "Corona").first()
    assert updated_beer.quantity == 48


def test_update_beer(db_session, sample_beers):
    stock_repo = StockRepository(db_session)
    stock_service = StockService(stock_repo)

    update_data = BeerUpdateSchema(price=120, quantity=60)
    result = stock_service.update_beer("Corona", update_data)

    assert result.name == "Corona"
    assert result.price == 120
    assert result.quantity == 60

    updated_beer = db_session.query(Beer).filter(Beer.name == "Corona").first()
    assert updated_beer.price == 120
    assert updated_beer.quantity == 60
