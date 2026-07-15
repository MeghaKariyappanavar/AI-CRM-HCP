from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.hcp import HCP
from app.models.interaction import Interaction

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def dashboard_stats(
    db: Session = Depends(get_db)
):

    total_hcps = db.query(HCP).count()

    total_interactions = db.query(Interaction).count()

    today_interactions = (
        db.query(Interaction)
        .filter(
            Interaction.created_at >= date.today()
        )
        .count()
    )

    pending_followups = (
        db.query(Interaction)
        .filter(
            Interaction.followup_date != None
        )
        .count()
    )

    recent_interactions = (
        db.query(Interaction)
        .order_by(
            Interaction.created_at.desc()
        )
        .limit(5)
        .all()
    )

    return {

        "total_hcps": total_hcps,

        "total_interactions": total_interactions,

        "today_interactions": today_interactions,

        "pending_followups": pending_followups,

        "recent_interactions": [
            {
                "doctor_name": item.doctor_name,
                "summary": item.summary,
                "sentiment": item.sentiment
            }
            for item in recent_interactions
        ]
    }