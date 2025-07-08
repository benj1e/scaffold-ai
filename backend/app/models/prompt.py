from sqlmodel import SQLModel, Relationship
from typing import Optional, List, TYPE_CHECKING
from datetime import datetime, timezone
from sqlmodel import Field
from uuid import uuid4, UUID

if TYPE_CHECKING:
    from .node import Node


class PromptBase(SQLModel):
    content: str


class Prompt(PromptBase, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    nodes: List["Node"] = Relationship(back_populates="prompt")


class PromptCreate(PromptBase):
    pass


class PromptRead(PromptBase):
    id: UUID
    created_at: datetime


class PromptUpdate(SQLModel):
    content: Optional[str] = None
    created_at: Optional[datetime] = None
