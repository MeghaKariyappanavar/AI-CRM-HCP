from sqlalchemy.orm import Session

from app.models.interaction import Interaction
from app.schemas.interaction import InteractionCreate


class InteractionService:

    @staticmethod
    def save_interaction(
        db: Session,
        data: InteractionCreate
    ):

        products = data.products_discussed

        if isinstance(products, list):
            products = ", ".join(products)

        interaction = Interaction(

            hcp_id=data.hcp_id,

            # doctor_name is NOT NULL in the DB. The AI-chat flow can
            # theoretically return an empty name, so fall back rather
            # than letting the insert fail with an IntegrityError.
            doctor_name=data.doctor_name or "Unknown",

            mode=data.type,

            discussion=data.discussion,

            products_discussed=products,

            sample_given=data.sample_given,

            followup_date=(
                str(data.followup_date)
                if data.followup_date
                else None
            ),

            summary=data.summary,

            notes=data.remarks,

            next_action=data.next_followup,

            sentiment=data.sentiment

        )

        db.add(interaction)

        db.commit()

        db.refresh(interaction)

        return interaction

    @staticmethod
    def get_all_interactions(db: Session):

        return db.query(Interaction).all()

    @staticmethod
    def get_interaction_by_id(db: Session, interaction_id: int):
        return (
            db.query(Interaction)
            .filter(Interaction.id == interaction_id)
            .first()
        )

    @staticmethod
    def update_interaction(
        db: Session,
        interaction_id: int,
        data: InteractionCreate
    ):
        interaction = (
            db.query(Interaction)
            .filter(Interaction.id == interaction_id)
            .first()
        )

        if interaction is None:
            return None

        products = data.products_discussed
        if isinstance(products, list):
            products = ", ".join(products)

        interaction.hcp_id = data.hcp_id
        interaction.doctor_name = data.doctor_name or "Unknown"
        interaction.mode = data.type
        interaction.discussion = data.discussion
        interaction.products_discussed = products
        interaction.sample_given = data.sample_given
        interaction.followup_date = (
            str(data.followup_date) if data.followup_date else None
        )
        interaction.summary = data.summary
        interaction.notes = data.remarks
        interaction.next_action = data.next_followup
        interaction.sentiment = data.sentiment

        db.commit()
        db.refresh(interaction)

        return interaction
