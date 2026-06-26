#author: Ean Pistorius @ tomcat endeavours

from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SMTP_HOST: str
    SMTP_PORT: str
    SMTP_USER: str
    SMTP_PASS: str
    FROM_EMAIL: str
    DOMAIN: str

    class Config:
        env_file = ".env"

settings = Settings()
