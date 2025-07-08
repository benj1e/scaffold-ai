# core/settings.py
from pydantic_settings import BaseSettings
from pydantic import Field
from dotenv import load_dotenv, find_dotenv
import os

load_dotenv()


class Settings(BaseSettings):
    DATABASE_URL: str = Field(default=os.environ["DATABASE_URL"])
    OPENROUTER_API_KEY: str = Field(default=os.environ["OPENROUTER_API_KEY"])
    DEBUG: bool = True
    VERSION: str = "0.1.0"

    class Config:
        env_file = find_dotenv()


settings = Settings()
