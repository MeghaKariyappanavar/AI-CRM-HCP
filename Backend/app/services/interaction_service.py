from sqlalchemy.orm import Session

from app.models.interaction import Interaction
from app.schemas.interaction import InteractionCreate


class InteractionService:

    @staticmethod
    def create_interaction(
        db: Session,
        interaction: InteractionCreate
    ):

        new_interaction = Interaction(
            **interaction.model_dump()
        )

        db.add(new_interaction)
        db.commit()
        db.refresh(new_interaction)

        return new_interaction

    @staticmethod
    def get_all_interactions(
        db: Session
    ):

        return db.query(Interaction).all()