from uuid import UUID, uuid4
from sqlmodel import Session
from app.models.node import Node, NodeType



def parse_generated_tree(
    data: dict, prompt_id: UUID, parent_id: UUID | None = None, collected=None
):
    if collected is None:
        collected = []

    node = Node(
        id=uuid4(),
        name=data["name"],
        type=NodeType(data["type"]),
        content=data.get("content"),
        parent_id=parent_id,
        prompt_id=prompt_id,
    )
    collected.append(node)

    for child in data.get("children", []):
        parse_generated_tree(
            child, prompt_id=prompt_id, parent_id=node.id, collected=collected
        )

    return collected
