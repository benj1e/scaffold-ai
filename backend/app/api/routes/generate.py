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
from app.services.llm import LLMService


class DeleteNodesPayload(BaseModel):
    node_ids: List[UUID]


router = APIRouter(prefix="/generate", tags=["Generate"])

# Simulated AI Response (mock, will be replaced later)


@router.post("/")
async def generate_project_structure(prompt_id: UUID, session: SessionDep):

    prompt = session.exec(select(Prompt).where(Prompt.id == prompt_id)).first()

    if not prompt:
        raise HTTPException(404, detail="Prompt not found")

    client = LLMService(prompt=prompt.content)
    try:
        ai_response = client.generate_project_structure()
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error generating project structure: {str(e)}"
        )
    # Parse and save AI-generated node tree
    nodes = parse_generated_tree(await ai_response, prompt_id=prompt_id)
    session.add_all(nodes)
    session.commit()

    return {
        "message": "Project generated successfully",
        "prompt_id": str(prompt.id),
        "tree": build_tree(nodes),
    }


@router.get("/{prompt_id}")
async def get_project_structure_by_prompt_id(prompt_id: UUID, session: SessionDep):
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
        stmt = delete(Node).where(Node.id.in_(node_ids))  # type: ignore
        session.exec(stmt)  # type: ignore
        session.commit()
        return {"message": f"Deleted {len(node_ids)} nodes."}

    return {"message": "No nodes found for the given prompt_id."}
