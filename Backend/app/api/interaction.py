from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.interaction import Interaction
from app.schemas.interaction import (
    InteractionCreate,
    InteractionResponse,
)

router = APIRouter(
    prefix="/api/interactions",
    tags=["Interactions"]
)


@router.post("/", response_model=InteractionResponse)
def create_interaction(
    interaction: InteractionCreate,
    db: Session = Depends(get_db)
):
    new_interaction = Interaction(
        **interaction.model_dump()
    )

    db.add(new_interaction)
    db.commit()
    db.refresh(new_interaction)

    return new_interaction
