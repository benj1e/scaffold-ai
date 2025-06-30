# core/settings.py
from pydantic_settings import BaseSettings
from pydantic import Field
from dotenv import load_dotenv
import os

load_dotenv()


class Settings(BaseSettings):
    DATABASE_URL: str = Field(default=os.environ["DATABASE_URL"])
    DEBUG: bool = True
    VERSION: str = "0.1.0"

    class Config:
        env_file = ".env"


settings = Settings()
