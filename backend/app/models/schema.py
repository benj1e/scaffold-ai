# I would need 3 models
# 1.) for the prompt gen
# 2.) for the templates page
# 3.) for the user field.

from sqlmodel import SQLModel, Field
from typing import Optional
from uuid import UUID, uuid4
from datetime import datetime, timezone


# Prompt
# # Templates
# class TemplateBase(SQLModel):
#     title: str
#     description: str
#     author: Optional[str] = "Unknown"
#     tags: list[str] = []
#     frameworks: list[str] = []
#     technologies: list[str] = []
#     file_structure_preview: Optional[str] = None
#     usage_instructions: Optional[str] = None
#     image_url: Optional[str] = None
#     github_url: Optional[str] = None
#     version: Optional[str] = None


# class TemplateCreate(TemplateBase):
#     pass


# class Template(TemplateBase, table=True):
#     id: UUID = Field(default_factory=uuid4, primary_key=True, index=True)
#     created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# class TemplateRead(SQLModel):
#     id: UUID
#     title: str
#     description: str
#     author: Optional[str]
#     tags: list[str]
#     frameworks: list[str]
#     technologies: list[str]
#     file_structure_preview: Optional[str]
#     usage_instructions: Optional[str]
#     image_url: Optional[str]
#     github_url: Optional[str]
#     version: Optional[str]
#     created_at: datetime
