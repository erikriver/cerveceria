from fastapi import FastAPI
from app.api.routes import router
from app.core.config import engine, Base
from app.init_db import init_db

app = FastAPI()

Base.metadata.create_all(bind=engine)
init_db()

app.include_router(router)
