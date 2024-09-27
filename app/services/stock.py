from app.repositories.stock import StockRepository
from app.models.schemas import StockSchema, BeerUpdateSchema
from app.models.domain import Beer


class StockService:
    def __init__(self, stock_repository: StockRepository):
        self.stock_repository = stock_repository

    def get_stock(self) -> StockSchema:
        return self.stock_repository.get_stock()

    def update_stock(self, beer_name: str, quantity: int) -> None:
        self.stock_repository.update_stock(beer_name, quantity)

    def update_beer(self, beer_name: str, update_data: BeerUpdateSchema) -> Beer:
        return self.stock_repository.update_beer(beer_name, update_data)
