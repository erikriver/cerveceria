from sqlalchemy.orm import Session
from app.models.domain import Beer
from app.models.schemas import StockSchema, BeerSchema, BeerUpdateSchema
from datetime import datetime

class StockRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_stock(self) -> StockSchema:
        beers = self.db.query(Beer).all()
        return StockSchema(
            last_updated=datetime.now(),
            beers=[BeerSchema(name=b.name, price=b.price, quantity=b.quantity) for b in beers]
        )

    def update_stock(self, beer_name: str, quantity_change: int) -> None:
        beer = self.db.query(Beer).filter(Beer.name == beer_name).first()
        if beer:
            beer.quantity += quantity_change
            self.db.commit()

    def update_beer(self, beer_name: str, update_data: BeerUpdateSchema) -> Beer:
        beer = self.db.query(Beer).filter(Beer.name == beer_name).first()
        if beer:
            if update_data.price is not None:
                beer.price = update_data.price
            if update_data.quantity is not None:
                beer.quantity = update_data.quantity
            self.db.commit()
            self.db.refresh(beer)
        return beer