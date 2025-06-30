from sqlmodel import SQLModel
from typing import Optional
from datetime import datetime, timezone
from sqlmodel import Field


class PromptBase(SQLModel):
    title: str
    content: str


class Prompt(PromptBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class PromptCreate(PromptBase):
    pass


class PromptRead(PromptBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None


class PromptUpdate(SQLModel):
    title: Optional[str] = None
    content: Optional[str] = None
    created_at: Optional[datetime] = None
