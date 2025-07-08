from typing import List
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import select
from sqlalchemy import delete
from uuid import UUID
from app.core.database import SessionDep
from app.models.prompt import Prompt, PromptCreate, PromptRead
from app.models.node import Node
from app.utils.tree_parser import parse_generated_tree
from app.models.node import build_tree


class DeleteNodesPayload(BaseModel):
    node_ids: List[UUID]


router = APIRouter(prefix="/generate", tags=["Generate"])

# Simulated AI Response (mock, will be replaced later)
mock_ai_structure = {
    "name": "MyAwesomeProject",
    "type": "folder",
    "children": [
        {"name": "main.py", "type": "file", "content": "print('Hello World')"},
        {
            "name": "models",
            "type": "folder",
            "children": [
                {"name": "user.py", "type": "file", "content": "# User model"}
            ],
        },
    ],
}


@router.post("/")
def generate_project_structure(prompt: PromptCreate, session: SessionDep):

    new_prompt = Prompt.model_validate(prompt)
    session.add(new_prompt)
    session.commit()
    session.refresh(new_prompt)

    if not new_prompt.id:
        raise HTTPException(404, detail="Prompt id not found")

    # Parse and save AI-generated node tree
    nodes = parse_generated_tree(mock_ai_structure, prompt_id=new_prompt.id)
    session.add_all(nodes)
    session.commit()

    return {
        "message": "Project generated successfully",
        "prompt_id": str(new_prompt.id),
        "tree": build_tree(nodes),
    }


@router.get("/{prompt_id}")
def get_project_structure_by_prompt_id(prompt_id: UUID, session: SessionDep):
    # Fetch all nodes linked to this prompt
    nodes = session.exec(select(Node).where(Node.prompt_id == prompt_id)).all()

    if not nodes:
        return {"message": "No structure found for this prompt"}

    return build_tree(nodes)


@router.delete("/{prompt_id}")
async def delete_project_structure_by_id(session: SessionDep, prompt_id: UUID):
    # First, get all node IDs for the given prompt_id
    node_ids = session.exec(select(Node.id).where(Node.prompt_id == prompt_id)).all()

    if node_ids:
        # Use the column object directly with in_() method
        stmt = delete(Node).where(Node.id.in_(node_ids)) # type: ignore
        session.exec(stmt) # type: ignore
        session.commit()
        return {"message": f"Deleted {len(node_ids)} nodes."}

    return {"message": "No nodes found for the given prompt_id."}
