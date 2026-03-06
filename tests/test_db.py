# author: Ean Pistorius @ tomcat endeavours

from sqlalchemy import create_engine
from app import settings

def test_db_connection():
    engine = create_engine(settings.DATABASE_URL)
    with engine.connect() as connection:
        assert not connection.closed, "Database connection should be open"
