from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List, Iterable, TYPE_CHECKING
from uuid import UUID, uuid4
from enum import Enum
from pydantic import BaseModel

# from .prompt import Prompt

if TYPE_CHECKING:
    from .prompt import Prompt


class NodeType(str, Enum):
    FILE = "file"
    FOLDER = "folder"


class BaseNode(SQLModel):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True, index=True)
    pass


class Node(BaseNode, table=True):
    name: str
    type: NodeType
    content: Optional[str] = None  # Only for files
    parent_id: Optional[UUID] = Field(default=None, foreign_key="node.id")
    prompt_id: UUID = Field(foreign_key="prompt.id", index=True)
    prompt: Optional["Prompt"] = Relationship(back_populates="nodes")


class CreateNode(BaseNode):
    name: str
    type: NodeType
    content: Optional[str] = None


class NodeResponse(BaseModel):
    id: UUID
    name: str
    type: NodeType
    content: Optional[str] = None
    children: Optional[List["NodeResponse"]] = None

    class Config:
        orm_mode = True


def build_tree(nodes: Iterable[Node]) -> List[NodeResponse]:
    node_map = {node.id: node for node in nodes}
    children_map = {}
    for node in nodes:
        children_map.setdefault(node.parent_id, []).append(node)

    def build_subtree(parent_id: Optional[UUID]) -> List[NodeResponse]:
        return [
            NodeResponse(
                id=node.id,
                name=node.name,
                type=node.type,
                content=node.content,
                children=(
                    build_subtree(node.id) if node.type == NodeType.FOLDER else None
                ),
            )
            for node in children_map.get(parent_id, [])
        ]

    return build_subtree(None)
