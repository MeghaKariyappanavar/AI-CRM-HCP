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