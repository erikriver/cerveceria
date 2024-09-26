import pytest
from unittest.mock import Mock, patch
from datetime import datetime
from sqlalchemy.orm import Session
from app.repositories.stock_repository import StockRepository
from app.models.domain import Beer
from app.models.schemas import StockSchema, BeerUpdateSchema

@pytest.fixture
def mock_db_session():
    return Mock(spec=Session)

@pytest.fixture
def stock_repository(mock_db_session):
    return StockRepository(mock_db_session)

def test_get_stock(stock_repository, mock_db_session, sample_beers):
    mock_db_session.query.return_value.all.return_value = sample_beers

    result = stock_repository.get_stock()

    assert isinstance(result, StockSchema)
    assert len(result.beers) == len(sample_beers)
    for i, beer in enumerate(result.beers):
        assert beer.name == sample_beers[i].name
        assert beer.price == sample_beers[i].price
        assert beer.quantity == sample_beers[i].quantity

def test_update_stock(stock_repository, mock_db_session):
    mock_beer = Mock(spec=Beer)
    mock_beer.quantity = 10
    mock_db_session.query.return_value.filter.return_value.first.return_value = mock_beer

    stock_repository.update_stock("Corona", -2)

    assert mock_beer.quantity == 8
    mock_db_session.commit.assert_called_once()


def test_update_beer(stock_repository, mock_db_session):
    mock_beer = Mock(spec=Beer)
    mock_beer.price = 100
    mock_beer.quantity = 50
    mock_db_session.query.return_value.filter.return_value.first.return_value = mock_beer

    update_data = BeerUpdateSchema(price=120, quantity=48)
    result = stock_repository.update_beer("Corona", update_data)

    assert result == mock_beer
    assert mock_beer.price == 120
    assert mock_beer.quantity == 48
    mock_db_session.commit.assert_called_once()
    mock_db_session.refresh.assert_called_once_with(mock_beer)

