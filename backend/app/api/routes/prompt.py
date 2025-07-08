from fastapi import APIRouter, HTTPException, status, Request
from sqlmodel import select
from app.core.database import SessionDep
from app.models.prompt import Prompt, PromptCreate, PromptRead, PromptUpdate
from typing import Optional

router = APIRouter(prefix="/prompt", tags=["Prompt"])


@router.post("/", response_model=PromptRead)
async def create_prompt(prompt: PromptCreate, session: SessionDep, request: Request):
    db_prompt = Prompt.model_validate(prompt)
    session.add(db_prompt)
    session.commit()
    session.refresh(db_prompt)
    return db_prompt.model_dump()


@router.get("/", response_model=list[PromptRead])
async def get_all_prompts(
    session: SessionDep, limit: Optional[int] = 100, offset: Optional[int] = 0
):
    result = session.exec(select(Prompt).offset(offset).limit(limit)).all()
    return result


@router.get("/{prompt_id}", response_model=PromptRead)
async def get_prompt(prompt_id: str, session: SessionDep):
    prompt = session.get(Prompt, prompt_id)
    if not prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")
    return prompt


@router.patch("/{prompt_id}", response_model=PromptRead)
async def update_prompt(prompt_id: str, update: PromptUpdate, session: SessionDep):
    prompt = session.get(Prompt, prompt_id)
    if not prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")

    prompt_data = update.model_dump(exclude_unset=True)
    for key, value in prompt_data.items():
        setattr(prompt, key, value)

    session.add(prompt)
    session.commit()
    session.refresh(prompt)
    return prompt


@router.delete("/{prompt_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_prompt(prompt_id: str, session: SessionDep):
    prompt = session.get(Prompt, prompt_id)
    if not prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")

    session.delete(prompt)
    session.commit()
    return

@router.delete("/recursive/all", status_code=status.HTTP_204_NO_CONTENT)
async def delete_all_prompts(session: SessionDep):
    prompts = session.exec(select(Prompt)).all()
    for prompt in prompts:
        session.delete(prompt)
    session.commit()
    return