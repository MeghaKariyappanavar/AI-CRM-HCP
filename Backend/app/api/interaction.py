from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.interaction import (
    InteractionCreate,
    InteractionResponse
)

from app.services.interaction_service import InteractionService

router = APIRouter(
    prefix="/api/interactions",
    tags=["Interaction"]
)


@router.post(
    "/",
    response_model=InteractionResponse
)
def save_interaction(
    interaction: InteractionCreate,
    db: Session = Depends(get_db)
):

    return InteractionService.save_interaction(
        db,
        interaction
    )


@router.get(
    "/",
    response_model=list[InteractionResponse]
)
def get_all_interactions(
    db: Session = Depends(get_db)
):

    return InteractionService.get_all_interactions(db)


@router.get("/history")
def get_interaction_history(
    db: Session = Depends(get_db)
):
    return InteractionService.get_all_interactions(db)


@router.get("/{interaction_id}", response_model=InteractionResponse)
def get_interaction(
    interaction_id: int,
    db: Session = Depends(get_db)
):
    interaction = InteractionService.get_interaction_by_id(db, interaction_id)

    if interaction is None:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Interaction not found.")

    return interaction


@router.put("/{interaction_id}", response_model=InteractionResponse)
def update_interaction(
    interaction_id: int,
    interaction: InteractionCreate,
    db: Session = Depends(get_db)
):
    updated = InteractionService.update_interaction(db, interaction_id, interaction)

    if updated is None:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Interaction not found.")

    return updated
