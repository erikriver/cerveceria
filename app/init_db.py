from sqlalchemy.orm import Session
from app.models.domain import Base, Beer, Order, Round, RoundItem
from app.core.config import engine, SessionLocal
from datetime import datetime, timedelta

def init_db():
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # Check if the database is already initialized
        if db.query(Beer).count() > 0:
            print("Database already contains data, skipping initialization.")
            return

        # Add initial beers
        beers = [
            Beer(name="Corona", price=115, quantity=100),
            Beer(name="Quilmes", price=120, quantity=80),
            Beer(name="Club Colombia", price=110, quantity=90),
            Beer(name="Heineken", price=130, quantity=70),
            Beer(name="Stella Artois", price=140, quantity=60),
        ]
        db.add_all(beers)
        db.commit()

        # Add an initial order with rounds
        order = Order(created=datetime.now(), paid=False, subtotal=575, taxes=109.25, discounts=0)
        db.add(order)
        db.flush()

        round1 = Round(created=datetime.now() - timedelta(minutes=30), order_id=order.id)
        round2 = Round(created=datetime.now() - timedelta(minutes=15), order_id=order.id)
        db.add_all([round1, round2])
        db.flush()

        round_items = [
            RoundItem(name="Corona", quantity=2, round_id=round1.id),
            RoundItem(name="Quilmes", quantity=1, round_id=round1.id),
            RoundItem(name="Club Colombia", quantity=1, round_id=round2.id),
            RoundItem(name="Heineken", quantity=1, round_id=round2.id),
        ]
        db.add_all(round_items)

        db.commit()
        print("Database initialized with sample data.")
    except Exception as e:
        print(f"An error occurred while initializing the database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_db()