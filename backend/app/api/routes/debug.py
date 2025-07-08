# routes/debug_test.py
from fastapi import APIRouter, Depends
from uuid import uuid4
from sqlmodel import select
from app.models.prompt import Prompt
from app.models.node import Node, NodeType
from app.core.database import SessionDep

router = APIRouter(prefix="/debug")


@router.get("/test-relation")
def test_prompt_node_relation(session: SessionDep):
    # Step 1: Create Prompt
    prompt = Prompt(content="Generate a simple Flask project")
    session.add(prompt)
    session.commit()
    session.refresh(prompt)

    # Step 2: Add two nodes under this prompt
    if prompt.id is None:
        raise ValueError("Prompt ID is None after commit/refresh.")
    node1 = Node(
        name="main.py",
        type=NodeType.FILE,
        content="print('Hello')",
        prompt_id=prompt.id,
    )
    node2 = Node(
        name="README.md",
        type=NodeType.FILE,
        content=r"# Flask Project",
        prompt_id=prompt.id,
    )
    session.add_all([node1, node2])
    session.commit()

    # Step 3: Fetch prompt and access .nodes
    loaded_prompt = session.exec(select(Prompt).where(Prompt.id == prompt.id)).one()

    return {
        "prompt": {
            "id": str(loaded_prompt.id),
            "nodes": [
                {"id": str(n.id), "name": n.name, "type": n.type, "content": n.content}
                for n in loaded_prompt.nodes
            ],
        }
    }
