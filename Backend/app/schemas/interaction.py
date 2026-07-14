from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class InteractionCreate(BaseModel):
    hcp_id: int
    mode: str
    discussion: Optional[str] = None
    products_discussed: Optional[str] = None
    sample_given: Optional[str] = None
    followup_date: Optional[str] = None
    summary: Optional[str] = None
    notes: Optional[str] = None
    next_action: Optional[str] = None
    sentiment: Optional[str] = None


class InteractionResponse(InteractionCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True