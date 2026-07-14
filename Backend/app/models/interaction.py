from datetime import datetime

from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String

from app.database.database import Base


class Interaction(Base):
    __tablename__ = "interaction"

    id = Column(Integer, primary_key=True, index=True)

    # HCP Reference
    hcp_id = Column(
        Integer,
        ForeignKey("hcp.id"),
        nullable=False
    )

    # AI Extracted Doctor Name
    doctor_name = Column(
        String(100),
        nullable=False
    )

    # Interaction Details
    mode = Column(
        String(20),
        nullable=False
    )  # Chat / Form

    discussion = Column(String(1000))

    products_discussed = Column(String(500))

    sample_given = Column(String(100))

    followup_date = Column(String(50))

    # AI Generated Fields
    summary = Column(String(1000))

    notes = Column(String(1000))

    next_action = Column(String(500))

    sentiment = Column(String(100))

    # Audit
    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )