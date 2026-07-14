from sqlalchemy.orm import Session

from app.models.interaction import Interaction


class InteractionUpdateService:

    @staticmethod
    def update(
        db: Session,
        interaction_id: int,
        notes: str,
        followup: str
    ):

        interaction = (
            db.query(Interaction)
            .filter(
                Interaction.id == interaction_id
            )
            .first()
        )

        if interaction is None:
            return None

        interaction.notes = notes
        interaction.next_action = followup

        db.commit()
        db.refresh(interaction)

        return interaction