# Cervecería FastAPI Service

This project implements a FastAPI service and frontend for a brewery, allowing control of beer orders and stock management. The project is using Clean Architecture.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/erikriver/cerveceria.git
   cd cerveceria
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate
   ```

3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

4. Run the service:
   ```
   uvicorn app.main:app --reload
   ```

## Makefile

There is a Makefile that simplify the last steps:

```
make venv      : Create virtual environment
make install   : Install dependencies
make run       : Run the application
make clean     : Clean up virtual environment and cache files
make test      : Run tests
make init-db   : Initialize the database
make all       : Create venv and install dependencies
```