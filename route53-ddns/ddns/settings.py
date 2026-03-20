#author: Ean Pistorius @ tomcat endeavours

from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    HOSTED_ZONE_ID: str
    RECORD_NAME: str
    TTL: int
    class Config:
        env_file = ".env"

settings = Settings()
