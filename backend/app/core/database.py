from sqlmodel import SQLModel, create_engine, Session
from fastapi import Depends
from app.core.settings import settings  # Adjust if your structure is different
from typing import Annotated

engine = create_engine(settings.DATABASE_URL)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


def init_db():
    from app.models.prompt import Prompt  # Adjust path

    SQLModel.metadata.create_all(engine)
