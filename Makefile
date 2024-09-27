VENV = venv
PYTHON = $(VENV)/bin/python
PIP = $(VENV)/bin/pip
UVICORN = $(VENV)/bin/uvicorn


.PHONY: all venv install run clean test init-db

all: venv install

venv:
	python3 -m venv $(VENV)

install: venv
	$(PIP) install -r requirements.txt

run:
	$(UVICORN) app.main:app --reload

clean:
	rm -rf $(VENV)
	find . -type f -name '*.pyc' -delete
	find . -type d -name '__pycache__' -delete

test:
	$(PYTHON) -m pytest
	rm test.db

init-db: venv
	$(PYTHON) app/init_db.py

help:
	@echo "Available commands:"
	@echo "  make venv      : Create virtual environment"
	@echo "  make install   : Install dependencies"
	@echo "  make run       : Run the application"
	@echo "  make clean     : Clean up virtual environment and cache files"
	@echo "  make test      : Run tests"
	@echo "  make init-db   : Initialize the database"
	@echo "  make all       : Create venv and install dependencies"
	@echo "  make help      : Show this help message"