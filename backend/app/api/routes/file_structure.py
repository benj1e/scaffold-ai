from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.models.file_structure import Node, NodeResponse, build_tree
from app.core.database import get_session
from typing import List

router = APIRouter()


@router.get("/file-tree", response_model=List[NodeResponse])
def get_file_tree(session: Session = Depends(get_session)):
    nodes = session.exec(select(Node)).all()
    return build_tree(nodes)
